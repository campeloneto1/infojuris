import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedService } from 'src/app/shared/shared.service';
import { Cidade, Cidades } from '../../cidades/cidades';
import { EstadoCivil, EstadosCivis } from '../../estados-civis/estados-civis';
import { EstadosCivisService } from '../../estados-civis/estados-civis.service';
import { Estado, Estados } from '../../estados/estados';
import { Ocupacao, Ocupacoes } from '../../ocupacoes/ocupacoes';
import { OcupacoesService } from '../../ocupacoes/ocupacoes.service';
import { Pais, Paises } from '../../paises/paises';
import { Sexo, Sexos } from '../../sexos/sexos';
import { SexosService } from '../../sexos/sexos.service';
import { Pessoa } from '../pessoas';
import { PessoasService } from '../pessoas.service';

@Component({
  selector: 'app-formulario-pessoas',
  templateUrl: './formulario-Pessoas.component.html',
  styleUrls: ['./formulario-Pessoas.component.css'],
  standalone: true,
  imports: [CommonModule, SharedModule], 
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

  protected config!: any
  protected config2!: any
  protected config3!: any
  protected config4!: any
  protected config5!: any
  protected config6!: any
  protected config7!: any

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
      estado_civil: [''],
      sexo_id: [''],
      sexo: [''],
      nacionalidade_id: [''],
      nacionalidade: [''],
      ocupacao_id: [''],
      ocupacao: [''],
      mae: [''],
      pai: [''],

      email: ['', Validators.compose([Validators.email])],
      telefone1: ['', Validators.compose([Validators.minLength(11)])],
      telefone2: ['', [Validators.minLength(11)]],

      rua: [''],
      numero: [''],
      pais_id: [''],
      pais: [''],
      estado_id: [''],
      estado: [''],
      cidade_id: [''],
      cidade: [''],
      complemento: [''],
      cep: [''],
    });

    this.config = this.sharedService.getConfig();
    this.config = {...this.config, displayFn:(item: EstadoCivil) => { return `${item.nome} `; }, placeholder:'Estado Civil'};

    this.config2 = this.sharedService.getConfig();
    this.config2 = {...this.config, displayFn:(item: Sexo) => { return `${item.nome}`; }, placeholder:'Sexo'};

    this.config3 = this.sharedService.getConfig();
    this.config3 = {...this.config, displayFn:(item: Pais) => { return `${item.nome}`; }, placeholder:'Nacionalidade'};

    this.config4 = this.sharedService.getConfig();
    this.config4 = {...this.config, displayFn:(item: Ocupacao) => { return `${item.nome}`; }, placeholder:'Ocupação'};

    this.config5 = this.sharedService.getConfig();
    this.config5 = {...this.config, displayFn:(item: Pais) => { return `${item.nome}`; }, placeholder:'País'};

    this.config6 = this.sharedService.getConfig();
    this.config6 = {...this.config, displayFn:(item: Estado) => { return `${item.nome}`; }, placeholder:'Estado'};

    this.config7 = this.sharedService.getConfig();
    this.config7 = {...this.config, displayFn:(item: Cidade) => { return `${item.nome}`; }, placeholder:'Cidade'};

    this.ocupacoes$ = this.ocupacoesService.index();
    this.sexos$ = this.sexosService.index();
    this.estadoscivis$ = this.estadosCivisService.index();
    this.paises$ = this.sharedService.getPaises();
  }

  getEstados() {
    if (this.form.value.pais.id) {
      this.estados$ = this.sharedService.getEstados(this.form.value.pais.id);
    }
  }

  getCidades() {
    if (this.form.value.estado.id) {
      this.cidades$ = this.sharedService.getCidades(this.form.value.estado.id);
    }
  }

  setForm(data: Pessoa) {
    this.form.patchValue(data);
    if (data.cidade?.estado?.pais_id) {
      this.form.get('pais')?.patchValue(data.cidade.estado.pais);
      this.estados$ = this.sharedService.getEstados(data.cidade.estado.pais_id);
    }
    if (data.cidade?.estado_id) {
      this.form.get('estado')?.patchValue(data.cidade.estado);
      this.cidades$ = this.sharedService.getCidades(data.cidade.estado_id);
    }
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    if(this.form.value.estado_civil){
      this.form.get('estado_civil_id')?.patchValue(this.form.value.estado_civil.id);
      this.form.get('estado_civil')?.patchValue('');
    }

    if(this.form.value.sexo){
      this.form.get('sexo_id')?.patchValue(this.form.value.sexo.id);
      this.form.get('sexo')?.patchValue('');
    }

    if(this.form.value.nacionalidade){
      this.form.get('nacionalidade_id')?.patchValue(this.form.value.nacionalidade.id);
      this.form.get('nacionalidade')?.patchValue('');
    }

    if(this.form.value.ocupacao){
      this.form.get('ocupacao_id')?.patchValue(this.form.value.ocupacao.id);
      this.form.get('ocupacao')?.patchValue('');
    }

    if(this.form.value.pais){
      this.form.get('pais_id')?.patchValue(this.form.value.pais.id);
      this.form.get('pais')?.patchValue('');
    }

    if(this.form.value.estado){
      this.form.get('estado_id')?.patchValue(this.form.value.estado.id);
      this.form.get('estado')?.patchValue('');
    }

    if(this.form.value.cidade){
      this.form.get('cidade_id')?.patchValue(this.form.value.cidade.id);
      this.form.get('cidade')?.patchValue('');
    }
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
