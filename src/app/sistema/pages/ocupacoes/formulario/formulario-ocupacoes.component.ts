import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { Ocupacao } from "../ocupacoes";
import { OcupacoesService } from "../ocupacoes.service";

@Component({
    selector: 'app-formulario-ocupacoes',
    templateUrl: './formulario-ocupacoes.component.html',
    styleUrls: ['./formulario-ocupacoes.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule],
})

export class FormularioOcupacoesComponent{
    @Output('refresh') refresh: EventEmitter<Ocupacao> = new EventEmitter();
    protected form!: FormGroup;
  
    constructor(
      private ocupacoesService: OcupacoesService,
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
        });
      }
    
      setForm(data: Ocupacao) {
        this.form.patchValue(data);
      }
    
      resetar() {
        this.form.reset();
      }
    
      cadastrar() {
        //console.log(this.form.value as Usuario);
        if (this.form.value.id) {
          this.ocupacoesService.update(this.form.value as Ocupacao).subscribe({
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
          this.ocupacoesService.store(this.form.value as Ocupacao).subscribe({
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
    
      editar(data: Ocupacao) {
        this.form.patchValue(data);
      }
}