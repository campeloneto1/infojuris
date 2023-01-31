import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { Cidades } from "../../cidades/cidades";
import { Escritorios } from "../../escritorios/escritorios";
import { EscritoriosService } from "../../escritorios/escritorios.service";
import { Estados } from "../../estados/estados";
import { Paises } from "../../paises/paises";
import { Filial } from "../filiais";
import { FiliaisService } from "../filiais.service";

@Component({
    selector: 'app-formulario-filiais',
    templateUrl: './formulario-filiais.component.html',
    styleUrls: ['./formulario-filiais.component.css']
})

export class FormularioFiliaisComponent{
    @Output('refresh') refresh: EventEmitter<Filial> = new EventEmitter();
  protected form!: FormGroup;

  protected escritorios$!: Observable<Escritorios>;
  protected paises$!: Observable<Paises>;
  protected estados$!: Observable<Estados>;
  protected cidades$!: Observable<Cidades>;


  constructor(
    private filiaisService: FiliaisService,
    private escritoriosService: EscritoriosService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      escritorio_id: ['', [Validators.required]],
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

    this.escritorios$ = this.escritoriosService.index();
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

  setForm(data: Filial) {
    this.form.patchValue(data);
    if(data.cidade.id){
      this.form.get('estado_id')?.patchValue(data.cidade.estado_id);
      this.estados$ = this.sharedService.getEstados(data.cidade.estado.pais_id);
    }
    if(data.cidade.estado.id){
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