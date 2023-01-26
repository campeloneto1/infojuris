import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { Cidades } from "../../cidades/cidades";
import { Comarcas } from "../../comarcas/comarcas";
import { Estados } from "../../estados/estados";
import { Paises } from "../../paises/paises";
import { Tribunais } from "../../tribunais/tribunais";
import { Vara } from "../varas";
import { VarasService } from "../varas.service";

@Component({
    selector: 'app-formulario-varas',
    templateUrl: './formulario-varas.component.html',
    styleUrls: ['./formulario-varas.component.css']
})

export class FormularioVarasComponent{
    @Output('refresh') refresh: EventEmitter<Vara> = new EventEmitter();
  protected form!: FormGroup;

  protected tribunais$!: Observable<Tribunais>;
  protected comarcas$!: Observable<Comarcas>;
  protected paises$!: Observable<Paises>;
  protected estados$!: Observable<Estados>;
  protected cidades$!: Observable<Cidades>;


  constructor(
    private varasService: VarasService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      tribunal_id: ['', [Validators.required]],
      comarca_id: ['', [Validators.required]],
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

    this.tribunais$ = this.sharedService.getTribunais();
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

  getComarcas(){
    if(this.form.value.tribunal_id){
      this.comarcas$ = this.sharedService.getComarcas(this.form.value.tribunal_id);
    }
  }

  setForm(data: Vara) {
    this.form.patchValue(data);
    if(data.comarca.tribunal_id){
      this.form.get('tribunal_id')?.patchValue(data.comarca.tribunal_id);
      this.comarcas$ = this.sharedService.getComarcas(data.comarca.tribunal_id);
    }
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