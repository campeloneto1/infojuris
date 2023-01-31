import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { Sexo } from '../sexos';
import { SexosService } from '../sexos.service';

@Component({
  selector: 'app-formulario-sexos',
  templateUrl: './formulario-sexos.component.html',
  styleUrls: ['./formulario-sexos.component.css'],
})
export class FormularioSexosComponent {
  @Output('refresh') refresh: EventEmitter<Sexo> = new EventEmitter();
  protected form!: FormGroup;

  constructor(
    private sexosService: SexosService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      nome: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(150),
        ]),
      ],
    });
  }

  setForm(data: Sexo) {
    this.form.patchValue(data);
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    //console.log(this.form.value);
    if (this.form.value.id) {
      this.sexosService.update(this.form.value as Sexo).subscribe({
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
      this.sexosService.store(this.form.value as Sexo).subscribe({
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
}
