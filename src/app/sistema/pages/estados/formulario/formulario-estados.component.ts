import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { Pais, Paises } from '../../paises/paises';
import { Estado } from '../estados';
import { EstadosService } from '../estados.service';

@Component({
  selector: 'app-formulario-estados',
  templateUrl: './formulario-estados.component.html',
  styleUrls: ['./formulario-estados.component.css'],
})
export class FormularioEstadosComponent {
  @Output('refresh') refresh: EventEmitter<Estado> = new EventEmitter();
  protected form!: FormGroup;

  protected paises$!: Observable<Paises>;


  constructor(
    private estadosService: EstadosService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      pais_id: ['', [Validators.required]],
      nome: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(150),
        ]),
      ],
      uf: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(10),
        ]),
      ],
    });

    this.paises$ = this.sharedService.getPaises();
  }

  setForm(data: Estado) {
    this.form.patchValue(data);
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    //console.log(this.form.value);
    if (this.form.value.id) {
      this.estadosService.update(this.form.value as Estado).subscribe({
        next: (data) => {
          this.sharedService.toast('Sucesso!', data as string, 3);
          this.form.reset();
          this.refresh.emit();
        },
        error: (error) => {
          this.sharedService.toast('Error!', error.erro as string, 2);
        },
      });
    } else {
      this.estadosService.store(this.form.value as Estado).subscribe({
        next: (data) => {
          this.sharedService.toast('Sucesso!', data as string, 1);
          this.form.reset();
          this.refresh.emit();
        },
        error: (error) => {
          this.sharedService.toast('Error!', error.erro as string, 2);
        },
      });
    }
  }

  editar(data: Estado) {
    this.form.patchValue(data);
  }
}
