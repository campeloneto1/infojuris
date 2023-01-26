import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
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
    styleUrls: ['./formulario-tribunais.component.css']

})

export class FormularioTribunaisComponent{
  @Output('refresh') refresh: EventEmitter<Tribunal> = new EventEmitter();
  protected form!: FormGroup;

  protected paises$!: Observable<Paises>;
  protected estados$!: Observable<Estados>;
  protected cidades$!: Observable<Cidades>;

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
      pais_id: ['', [Validators.required]],
      estado_id: ['', [Validators.required]],
      cidade_id: ['', [Validators.required]],
      complemento: [''],
      cep: [''],
    });

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

  setForm(data: Tribunal) {
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