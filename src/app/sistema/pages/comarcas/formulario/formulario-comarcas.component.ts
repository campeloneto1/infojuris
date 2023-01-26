import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { Cidades } from "../../cidades/cidades";
import { Estados } from "../../estados/estados";
import { Paises } from "../../paises/paises";
import { Tribunais, Tribunal } from "../../tribunais/tribunais";
import { TribunaisService } from "../../tribunais/tribunais.service";
import { Comarca, Comarcas } from "../comarcas";
import { ComarcasService } from "../comarcas.service";

@Component({
    selector: 'app-formulario-comarcas',
    templateUrl: './formulario-comarcas.component.html',
    styleUrls: ['./formulario-comarcas.component.css']
})

export class FormularioComarcasComponent{
    @Output('refresh') refresh: EventEmitter<Comarca> = new EventEmitter();
  protected form!: FormGroup;

  protected tribunais$!: Observable<Tribunais>;
  protected paises$!: Observable<Paises>;
  protected estados$!: Observable<Estados>;
  protected cidades$!: Observable<Cidades>;


  constructor(
    private comarcasService: ComarcasService,
    private tribunaisService: TribunaisService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      tribunal_id: ['', [Validators.required]],
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
      pais_id: ['', [Validators.required]],
      estado_id: ['', [Validators.required]],
      cidade_id: ['', [Validators.required]],
      complemento: [''],
      cep: [''],
    });

    this.tribunais$ = this.tribunaisService.index();
    this.paises$ = this.sharedService.getPaises();
  }

  getEstados(){
    if(this.form.value.pais_id){
      this.estados$ = this.sharedService.getEstados(this.form.value.pais_id);
    }
    
  }

  getCidades(){
    if(this.form.value.estado_id){
      this.cidades$ = this.sharedService.getCidades(this.form.value.estado_id);
    }
  }

  setForm(data: Comarca) {
    this.form.patchValue(data);
    if(data.cidade.estado_id){
      this.form.get('estado_id')?.patchValue(data.cidade.estado_id);
      this.estados$ = this.sharedService.getEstados(data.cidade.estado.pais_id);
    }
    if(data.cidade.estado.pais_id){
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
      this.comarcasService.update(this.form.value as Comarca).subscribe({
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
      this.comarcasService.store(this.form.value as Comarca).subscribe({
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

  editar(data: Comarca) {
    this.form.patchValue(data);
  }
}