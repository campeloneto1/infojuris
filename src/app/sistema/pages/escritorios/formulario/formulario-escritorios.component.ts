import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { Cidades } from "../../cidades/cidades";
import { Estados } from "../../estados/estados";
import { Paises } from "../../paises/paises";
import { Escritorio } from "../escritorios";
import { EscritoriosService } from "../escritorios.service";

@Component({
    selector: 'app-formulario-escritorios',
    templateUrl: './formulario-escritorios.component.html',
    styleUrls: ['./formulario-escritorios.component.css']
})

export class FormularioEscritoriosComponent{
    @Output('refresh') refresh: EventEmitter<Escritorio> = new EventEmitter();
  protected form!: FormGroup;

  protected paises$!: Observable<Paises>;
  protected estados$!: Observable<Estados>;
  protected cidades$!: Observable<Cidades>;

  constructor(
    private escritoriosService: EscritoriosService,
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
      cnpj: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14),
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
      estado_id: [''],
      cidade_id: [''],
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

  setForm(data: Escritorio) {
    this.form.patchValue(data);
    if(data.cidade?.estado_id){
      this.form.get('estado_id')?.patchValue(data.cidade?.estado_id);
      this.estados$ = this.sharedService.getEstados(data.cidade?.estado?.pais_id);
    }
    if(data.cidade?.estado.pais_id){
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
      this.escritoriosService.update(this.form.value as Escritorio).subscribe({
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
      this.escritoriosService.store(this.form.value as Escritorio).subscribe({
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