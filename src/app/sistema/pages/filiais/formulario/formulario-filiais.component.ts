import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { Cidade, Cidades } from "../../cidades/cidades";
import { Escritorio, Escritorios } from "../../escritorios/escritorios";
import { EscritoriosService } from "../../escritorios/escritorios.service";
import { Estado, Estados } from "../../estados/estados";
import { Pais, Paises } from "../../paises/paises";
import { Filial } from "../filiais";
import { FiliaisService } from "../filiais.service";

@Component({
    selector: 'app-formulario-filiais',
    templateUrl: './formulario-filiais.component.html',
    styleUrls: ['./formulario-filiais.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule], 
})

export class FormularioFiliaisComponent{
    @Output('refresh') refresh: EventEmitter<Filial> = new EventEmitter();
  protected form!: FormGroup;

  protected escritorios$!: Observable<Escritorios>;
  protected paises$!: Observable<Paises>;
  protected estados$!: Observable<Estados>;
  protected cidades$!: Observable<Cidades>;

  protected config!: any
  protected config2!: any
  protected config3!: any
  protected config4!: any

  constructor(
    private filiaisService: FiliaisService,
    private escritoriosService: EscritoriosService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      escritorio_id: [''],
      escritorio: ['', [Validators.required]],
      nome: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(150),
        ]),
      ],
      email: ['', Validators.compose([Validators.email])],
      telefone1: [
        '',
        Validators.compose([Validators.minLength(11)]),
      ],
      telefone2: ['', [Validators.minLength(11)]],
      rua: [''],
      numero: [''],
      pais: ['', [Validators.required]],
      pais_id: [''],
      estado_id: [''],
      estado: ['', [Validators.required]],
      cidade_id: [''],
      cidade: ['', [Validators.required]],
      complemento: [''],
      cep: [''],
    });

    this.config = this.sharedService.getConfig();
    this.config = {...this.config, displayFn:(item: Escritorio) => { return `${item.nome}`; }, placeholder:'Escritório'};

    this.config2 = this.sharedService.getConfig();
    this.config2 = {...this.config, displayFn:(item: Pais) => { return `${item.nome}`; }, placeholder:'País'};

    this.config3 = this.sharedService.getConfig();
    this.config3 = {...this.config, displayFn:(item: Estado) => { return `${item.nome}`; }, placeholder:'Estado'};

    this.config4 = this.sharedService.getConfig();
    this.config4 = {...this.config, displayFn:(item: Cidade) => { return `${item.nome}`; }, placeholder:'Cidade'};

    this.escritorios$ = this.escritoriosService.index();
    this.paises$ = this.sharedService.getPaises();
  }

  getEstados(){
    if(this.form.value.pais.id){
      this.estados$ = this.sharedService.getEstados(this.form.value.pais.id);
    }
    
  }

  getCidades(){
    if(this.form.value.estado.id){
      this.cidades$ = this.sharedService.getCidades(this.form.value.estado.id);
    }
  }

  setForm(data: Filial) {
    this.form.patchValue(data);
    if(data.cidade.id){
      //this.form.get('estado_id')?.patchValue(data.cidade.estado_id);
      this.estados$ = this.sharedService.getEstados(data.cidade.estado.pais_id);
    }
    if(data.cidade.estado.id){
      //this.form.get('pais_id')?.patchValue(data.cidade.estado.pais_id);
      this.cidades$ = this.sharedService.getCidades(data.cidade.estado_id);
    }   
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    if(this.form.value.escritorio){
      this.form.get('escritorio_id')?.patchValue(this.form.value.escritorio.id);
      this.form.get('escritorio')?.patchValue('');
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
      this.filiaisService.update(this.form.value as Filial).subscribe({
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
      this.filiaisService.store(this.form.value as Filial).subscribe({
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

  editar(data: Filial) {
    this.form.patchValue(data);
  }
}