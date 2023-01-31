import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "src/app/shared/shared.service";
import { EstadoCivil } from "../estados-civis";
import { EstadosCivisService } from "../estados-civis.service";

@Component({
    selector: 'app-formulario-estados-civis',
    templateUrl: './formulario-estados-civis.component.html',
    styleUrls: ['./formulario-estados-civis.component.css']
})

export class FormularioEstadosCivisComponent{
    @Output('refresh') refresh: EventEmitter<EstadoCivil> = new EventEmitter();
    protected form!: FormGroup;
  
    constructor(
      private estadosCivisService: EstadosCivisService,
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
            Validators.minLength(4),
            Validators.maxLength(150),
          ]),
        ],
      });
    }
  
    setForm(data: EstadoCivil) {
      this.form.patchValue(data);
    }
  
    resetar() {
      this.form.reset();
    }
  
    cadastrar() {
      //console.log(this.form.value);
      if (this.form.value.id) {
        this.estadosCivisService.update(this.form.value as EstadoCivil).subscribe({
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
        this.estadosCivisService.store(this.form.value as EstadoCivil).subscribe({
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