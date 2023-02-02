import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { Cidade, Cidades } from "../../cidades/cidades";
import { Estado, Estados } from "../../estados/estados";
import { Pais, Paises } from "../../paises/paises";
import { PaisesService } from "../../paises/paises.service";
import { Tribunal } from "../tribunais";
import { TribunaisService } from "../tribunais.service";

@Component({
    selector: 'app-formulario-tribunais',
    templateUrl: './formulario-tribunais.component.html',
    styleUrls: ['./formulario-tribunais.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule], 

})

export class FormularioTribunaisComponent{
  @Output('refresh') refresh: EventEmitter<Tribunal> = new EventEmitter();
  protected form!: FormGroup;

  protected paises$!: Observable<Paises>;
  protected estados$!: Observable<Estados>;
  protected cidades$!: Observable<Cidades>;

  protected config!: any
  protected config2!: any
  protected config3!: any

  constructor(
    private tribunaisService: TribunaisService,
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
          Validators.minLength(5),
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
    this.config = {...this.config, displayFn:(item: Pais) => { return `${item.nome}`; }, placeholder:'País'};

    this.config2 = this.sharedService.getConfig();
    this.config2 = {...this.config, displayFn:(item: Estado) => { return `${item.nome}`; }, placeholder:'Estado'};

    this.config3 = this.sharedService.getConfig();
    this.config3 = {...this.config, displayFn:(item: Cidade) => { return `${item.nome}`; }, placeholder:'Cidade'};

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

  setForm(data: Tribunal) {
    this.form.patchValue(data);
    
    if(data?.cidade_id){
      this.form.get('pais')?.patchValue(data.cidade?.estado?.pais);
      this.estados$ = this.sharedService.getEstados(data.cidade?.estado?.pais_id);

      this.form.get('estado')?.patchValue(data.cidade?.estado);
      this.cidades$ = this.sharedService.getCidades(data.cidade?.estado_id);
    }
  
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
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

    //console.log(this.form.value as Usuario);
    if (this.form.value.id) {
      this.tribunaisService.update(this.form.value as Tribunal).subscribe({
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
      this.tribunaisService.store(this.form.value as Tribunal).subscribe({
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