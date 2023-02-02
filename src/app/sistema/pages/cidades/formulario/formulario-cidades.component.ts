import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { Estado, Estados } from "../../estados/estados";
import { Pais, Paises } from "../../paises/paises";
import { Cidade } from "../cidades";
import { CidadesService } from "../cidades.service";

@Component({
    selector: 'app-formulario-cidades',
    templateUrl: './formulario-cidades.component.html',
    styleUrls: ['./formulario-cidades.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule], 
})

export class FormularioCidadesComponent{
    @Output('refresh') refresh: EventEmitter<Cidade> = new EventEmitter();
    protected form!: FormGroup;
  
    protected paises$!: Observable<Paises>;
    protected estados$!: Observable<Estados>;

    
    protected config!: any;
    protected config2!: any;
  
    constructor(
        private cidadesService: CidadesService,
      private sharedService: SharedService,
      private formBuilder: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.form = this.formBuilder.group({
        id: [''],
        pais_id: [''],
        pais: ['', [Validators.required]],
        estado_id: [''],
        estado: ['', [Validators.required]],
        nome: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(150),
          ]),
        ],
      });

      this.config = this.sharedService.getConfig();
      this.config = {...this.config, displayFn:(item: Pais) => { return `${item.nome}`; }, placeholder:'País'};

      this.config2 = this.sharedService.getConfig();
      this.config2 = {...this.config, displayFn:(item: Estado) => { return `${item.nome}`; }, placeholder:'Estado'};
        
      this.paises$ = this.sharedService.getPaises();
    }

    getEstados(){
      if(this.form.value.pais.id){
        this.estados$ = this.sharedService.getEstados(this.form.value.pais.id);
      }
       
    }
  
    setForm(data: Cidade) {
     
      this.form.patchValue(data);
      this.form.get('pais')?.patchValue(data.estado.pais);
      this.estados$ = this.sharedService.getEstados(data.estado.pais_id);
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