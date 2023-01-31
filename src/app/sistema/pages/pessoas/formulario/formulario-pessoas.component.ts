import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { Cidades } from '../../cidades/cidades';
import { EstadosCivis } from '../../estados-civis/estados-civis';
import { EstadosCivisService } from '../../estados-civis/estados-civis.service';
import { Estados } from '../../estados/estados';
import { Ocupacoes } from '../../ocupacoes/ocupacoes';
import { OcupacoesService } from '../../ocupacoes/ocupacoes.service';
import { Paises } from '../../paises/paises';
import { Sexos } from '../../sexos/sexos';
import { SexosService } from '../../sexos/sexos.service';
import { Pessoa } from '../pessoas';
import { PessoasService } from '../pessoas.service';

@Component({
  selector: 'app-formulario-pessoas',
  templateUrl: './formulario-Pessoas.component.html',
  styleUrls: ['./formulario-Pessoas.component.css'],
})
export class FormularioPessoasComponent {
  @Output('refresh') refresh: EventEmitter<Pessoa> = new EventEmitter();
  protected form!: FormGroup;

  protected ocupacoes$!: Observable<Ocupacoes>;
  protected paises$!: Observable<Paises>;
  protected estados$!: Observable<Estados>;
  protected cidades$!: Observable<Cidades>;
  protected estadoscivis$!: Observable<EstadosCivis>;
  protected sexos$!: Observable<Sexos>;


  constructor(
    private PessoasService: PessoasService,
    private ocupacoesService: OcupacoesService,
    private estadosCivisService: EstadosCivisService,
    private sexosService: SexosService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      escritorio_id: [''],
      nome: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(150),
        ]),
      ],
      cpf: [
        '',
        Validators.compose([Validators.required, Validators.minLength(11)]),
      ],
      data_nascimento: ['', Validators.compose([Validators.required])],

      estado_civil_id: [''],
      sexo_id: [''],
      nacionalidade_id: [''],
      ocupacao_id: [''],
      mae: [''],
      pai: [''],

      email: ['', Validators.compose([Validators.email])],
      telefone1: ['', Validators.compose([Validators.minLength(11)])],
      telefone2: ['', [Validators.minLength(11)]],

      rua: [''],
      numero: [''],
      pais_id: [''],
      estado_id: [''],
      cidade_id: [''],
      complemento: [''],
      cep: [''],
    });

    this.ocupacoes$ = this.ocupacoesService.index();
    this.sexos$ = this.sexosService.index();
    this.estadoscivis$ = this.estadosCivisService.index();
    this.paises$ = this.sharedService.getPaises();
  }

  getEstados() {
    if (this.form.value.pais_id) {
      this.estados$ = this.sharedService.getEstados(this.form.value.pais_id);
    }
  }

  getCidades() {
    if (this.form.value.estado_id) {
      this.cidades$ = this.sharedService.getCidades(this.form.value.estado_id);
    }
  }

  setForm(data: Pessoa) {
    this.form.patchValue(data);
    if (data.cidade.estado_id) {
      this.form.get('estado_id')?.patchValue(data.cidade.estado_id);
      this.estados$ = this.sharedService.getEstados(data.cidade.estado.pais_id);
    }
    if (data.cidade.estado.pais_id) {
      this.form.get('pais_id')?.patchValue(data.cidade.estado.pais_id);
      this.cidades$ = this.sharedService.getCidades(data.cidade.estado_id);
    }
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    //console.log(this.form.value);
    if (this.form.value.id) {
      this.PessoasService.update(this.form.value as Pessoa).subscribe({
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
      this.PessoasService.store(this.form.value as Pessoa).subscribe({
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
