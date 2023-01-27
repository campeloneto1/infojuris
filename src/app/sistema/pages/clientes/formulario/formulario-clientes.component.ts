import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { Cidades } from '../../cidades/cidades';
import { Estados } from '../../estados/estados';
import { Ocupacoes } from '../../ocupacoes/ocupacoes';
import { OcupacoesService } from '../../ocupacoes/ocupacoes.service';
import { Paises } from '../../paises/paises';
import { Cliente } from '../clientes';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-formulario-clientes',
  templateUrl: './formulario-clientes.component.html',
  styleUrls: ['./formulario-clientes.component.css'],
})
export class FormularioClientesComponent {
  @Output('refresh') refresh: EventEmitter<Cliente> = new EventEmitter();
  protected form!: FormGroup;

  protected ocupacoes$!: Observable<Ocupacoes>;
  protected paises$!: Observable<Paises>;
  protected estados$!: Observable<Estados>;
  protected cidades$!: Observable<Cidades>;

  protected sexos$: Observable<any> = of([
    {
      id: 1,
      nome: 'Masculino',
    },
    {
      id: 2,
      nome: 'Feminino',
    },
    {
      id: 3,
      nome: 'Não Informado',
    },
  ]);

  protected estadoscivis$: Observable<any> = of([
    {
      id: 1,
      nome: 'Solteiro',
    },
    {
      id: 2,
      nome: 'Casado',
    },
    {
      id: 3,
      nome: 'Divorciado',
    },
    {
      id: 4,
      nome: 'Viúvo',
    },
    {
      id: 5,
      nome: 'União Estável',
    },
  ]);

  constructor(
    private clientesService: ClientesService,
    private ocupacoesService: OcupacoesService,
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

      estado_civil: [''],
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
      pais_id: ['', [Validators.required]],
      estado_id: ['', [Validators.required]],
      cidade_id: ['', [Validators.required]],
      complemento: [''],
      cep: [''],
    });

    this.ocupacoes$ = this.ocupacoesService.index();
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

  setForm(data: Cliente) {
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
      this.clientesService.update(this.form.value as Cliente).subscribe({
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
      this.clientesService.store(this.form.value as Cliente).subscribe({
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
