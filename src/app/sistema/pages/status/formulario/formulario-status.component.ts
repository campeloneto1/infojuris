import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { Status } from "../status";
import { StatusService } from "../status.service";

@Component({
    selector: 'app-formulario-status',
    templateUrl: './formulario-status.component.html',
    styleUrls: ['./formulario-status.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule], 
})

export class FormularioStatusComponent{
    @Output('refresh') refresh: EventEmitter<Status> = new EventEmitter();
    protected form!: FormGroup;
  
    constructor(
      private statusService: StatusService,
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
        aberto: [''],
        andamento: [''],
        concluido: [''],
        incidente: [''],
        cancelado: [''],
      });
    }
  
    setForm(data: Status) {
      this.form.patchValue(data);
    }
  
    resetar() {
      this.form.reset();
    }
  
    cadastrar() {
  
      //console.log(this.form.value);
      if (this.form.value.id) {
        this.statusService.update(this.form.value as Status).subscribe({
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
        this.statusService.store(this.form.value as Status).subscribe({
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