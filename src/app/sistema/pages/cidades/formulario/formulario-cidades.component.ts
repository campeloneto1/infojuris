import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { Estado, Estados } from "../../estados/estados";
import { EstadosService } from "../../estados/estados.service";
import { Pais, Paises } from "../../paises/paises";
import { PaisesService } from "../../paises/paises.service";
import { Cidade } from "../cidades";
import { CidadesService } from "../cidades.service";

@Component({
    selector: 'app-formulario-cidades',
    templateUrl: './formulario-cidades.component.html',
    styleUrls: ['./formulario-cidades.component.css']
})

export class FormularioCidadesComponent{
    @Output('refresh') refresh: EventEmitter<Cidade> = new EventEmitter();
    protected form!: FormGroup;
  
    protected paises$!: Observable<Paises>;
    protected estados$!: Observable<Estados>;
  
  
    constructor(
        private cidadesService: CidadesService,
      private sharedService: SharedService,
      private formBuilder: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.form = this.formBuilder.group({
        id: [''],
        pais_id: ['', [Validators.required]],
        estado_id: ['', [Validators.required]],
        nome: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(150),
          ]),
        ],
      });
        
      this.paises$ = this.sharedService.getPaises();
    }

    getEstados(){
      if(this.form.value.pais_id){
        this.estados$ = this.sharedService.getEstados(this.form.value.pais_id);
      }
       
    }
  
    setForm(data: Cidade) {
     
      this.form.patchValue(data);
      this.form.get('pais_id')?.patchValue(data.estado.pais_id);
      this.estados$ = this.sharedService.getEstados(data.estado.pais_id);
    }
  
    resetar() {
      this.form.reset();
    }
  
    cadastrar() {
      
      if (this.form.value.id) {
        this.cidadesService.update(this.form.value as Cidade).subscribe({
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
        this.cidadesService.store(this.form.value as Cidade).subscribe({
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