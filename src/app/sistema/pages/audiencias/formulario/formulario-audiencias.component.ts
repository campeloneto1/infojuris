import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { Processos } from '../../processos/processos';
import { ProcessosService } from '../../processos/processos.service';
import { Audiencia } from '../audiencias';
import { AudienciasService } from '../audiencias.service';

@Component({
  selector: 'app-formulario-audiencias',
  templateUrl: './formulario-audiencias.component.html',
  styleUrls: ['./formulario-audiencias.component.css'],
})
export class FormularioAudienciasComponent implements OnInit{
  @Output('refresh') refresh: EventEmitter<Audiencia> = new EventEmitter();
  protected form!: FormGroup;

  protected processos$!: Observable<Processos>;

  protected tipos$ = of([
    { id: 1, nome: 'Presencial' },
    { id: 2, nome: 'On-Line' },
  ]);

  constructor(
    private processosService: ProcessosService,
    private audienciasService: AudienciasService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      processo_id: ['', [Validators.required]],
      tipo_id: ['', [Validators.required]],
      link: [
        '',
        Validators.compose([
          Validators.minLength(20),
          Validators.maxLength(150),
        ]),
      ],
      data: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      obs: [''],
    });

    this.processos$ = this.processosService.index();
  }

  setForm(data: Audiencia) {
    this.form.patchValue(data);
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    //console.log(this.form.value);
    if (this.form.value.id) {
      this.audienciasService.update(this.form.value as Audiencia).subscribe({
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
      this.audienciasService.store(this.form.value as Audiencia).subscribe({
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
