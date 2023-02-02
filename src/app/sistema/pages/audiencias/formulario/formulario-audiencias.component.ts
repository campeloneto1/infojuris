import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedService } from 'src/app/shared/shared.service';
import { Processo, Processos } from '../../processos/processos';
import { ProcessosService } from '../../processos/processos.service';
import { Audiencia } from '../audiencias';
import { AudienciasService } from '../audiencias.service';

@Component({
  selector: 'app-formulario-audiencias',
  templateUrl: './formulario-audiencias.component.html',
  styleUrls: ['./formulario-audiencias.component.css'],
  standalone: true,
  imports: [CommonModule, SharedModule]
})
export class FormularioAudienciasComponent implements OnInit{
  @Output('refresh') refresh: EventEmitter<Audiencia> = new EventEmitter();
  protected form!: FormGroup;

  protected processos$!: Observable<Processos>;

  protected tipos$ = of([
    { id: 1, nome: 'Presencial' },
    { id: 2, nome: 'On-Line' },
  ]);

  protected config!: any
  protected config2!: any

  constructor(
    private processosService: ProcessosService,
    private audienciasService: AudienciasService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      processo_id: [''],
      processo: ['', [Validators.required]],
      tipo_id: [''],
      tipo: ['', [Validators.required]],
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

    this.config = this.sharedService.getConfig();
    this.config = {...this.config, displayFn:(item: Processo) => { return item.codigo; }, placeholder:'Processo'};

    this.config2 = this.sharedService.getConfig();
    this.config2= {...this.config, displayFn:(item: any) => { return item.nome; }, placeholder:'Tipo'};
  }

  setForm(data: Audiencia) {
    this.form.patchValue(data);
    
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    //console.log(this.form.value)

    if(this.form.value.processo.id){
      this.form.get('processo_id')?.patchValue(this.form.value.processo.id);
    this.form.get('processo')?.patchValue('');
    }
    if(this.form.value.tipo.id){
      this.form.get('tipo_id')?.patchValue(this.form.value.tipo.id);
      this.form.get('tipo')?.patchValue('');
    }

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
