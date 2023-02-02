import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { Cidade, Cidades } from "../../cidades/cidades";
import { Comarca, Comarcas } from "../../comarcas/comarcas";
import { Estado, Estados } from "../../estados/estados";
import { Pais, Paises } from "../../paises/paises";
import { Tribunais, Tribunal } from "../../tribunais/tribunais";
import { Vara } from "../varas";
import { VarasService } from "../varas.service";

@Component({
    selector: 'app-formulario-varas',
    templateUrl: './formulario-varas.component.html',
    styleUrls: ['./formulario-varas.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule], 
})

export class FormularioVarasComponent{
    @Output('refresh') refresh: EventEmitter<Vara> = new EventEmitter();
  protected form!: FormGroup;

  protected tribunais$!: Observable<Tribunais>;
  protected comarcas$!: Observable<Comarcas>;
  protected paises$!: Observable<Paises>;
  protected estados$!: Observable<Estados>;
  protected cidades$!: Observable<Cidades>;

  protected config!: any
  protected config2!: any
  protected config3!: any
  protected config4!: any
  protected config5!: any

  constructor(
    private varasService: VarasService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      tribunal_id: [''],
      tribunal: ['', [Validators.required]],
      comarca_id: [''],
      comarca: ['', [Validators.required]],
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
      pais_id: [''],
      pais: ['', [Validators.required]],
      estado_id: [''],
      estado: ['', [Validators.required]],
      cidade_id: [''],
      cidade: ['', [Validators.required]],
      complemento: [''],
      cep: [''],
    });

    this.config = this.sharedService.getConfig();
    this.config = {...this.config, displayFn:(item: Tribunal) => { return `${item.nome}`; }, placeholder:'Tribunal'};

    this.config2 = this.sharedService.getConfig();
    this.config2 = {...this.config, displayFn:(item: Comarca) => { return `${item.nome}`; }, placeholder:'Comarca'};

    this.config3 = this.sharedService.getConfig();
    this.config3 = {...this.config, displayFn:(item: Pais) => { return `${item.nome}`; }, placeholder:'País'};

    this.config4 = this.sharedService.getConfig();
    this.config4 = {...this.config, displayFn:(item: Estado) => { return `${item.nome}`; }, placeholder:'Estado'};

    this.config5 = this.sharedService.getConfig();
    this.config5 = {...this.config, displayFn:(item: Cidade) => { return `${item.nome}`; }, placeholder:'Cidade'};

    this.tribunais$ = this.sharedService.getTribunais();
    this.paises$ = this.sharedService.getPaises();
  }

  getEstados(){
    if(this.form.value.pais){
      this.estados$ = this.sharedService.getEstados(this.form.value.pais.id);
    }
    
  }

  getCidades(){
    if(this.form.value.estado){
      this.cidades$ = this.sharedService.getCidades(this.form.value.estado.id);
    }
  }

  getComarcas(){
    if(this.form.value.tribunal){
      this.comarcas$ = this.sharedService.getComarcas(this.form.value.tribunal.id);
    }
  }

  setForm(data: Vara) {
    this.form.patchValue(data);
    if(data.comarca.tribunal){
      this.form.get('comarca')?.patchValue(data.comarca);
      this.form.get('tribunal')?.patchValue(data.comarca.tribunal);
      this.comarcas$ = this.sharedService.getComarcas(data.comarca.tribunal_id);
    }
    if(data.cidade.estado.pais_id){
    
      this.form.get('pais')?.patchValue(data.cidade.estado.pais);
      this.estados$ = this.sharedService.getEstados(data.cidade.estado.pais_id);
    }
    if(data.cidade.estado_id){
      this.form.get('estado')?.patchValue(data.cidade.estado);
      this.cidades$ = this.sharedService.getCidades(data.cidade.estado_id);
    }   
    
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    if(this.form.value.tribunal){
      this.form.get('tribunal_id')?.patchValue(this.form.value.tribunal.id);
      this.form.get('tribunal')?.patchValue('');
    }

    if(this.form.value.comarca){
      this.form.get('comarca_id')?.patchValue(this.form.value.comarca.id);
      this.form.get('comarca')?.patchValue('');
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
      this.varasService.update(this.form.value as Vara).subscribe({
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
      this.varasService.store(this.form.value as Vara).subscribe({
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