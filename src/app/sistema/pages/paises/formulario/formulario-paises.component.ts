import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "src/app/shared/shared.service";
import { Pais } from "../paises";
import { PaisesService } from "../paises.service";

@Component({
    selector: 'app-formulario-paises',
    templateUrl: './formulario-paises.component.html',
    styleUrls: ['./formulario-paises.component.css']
})

export class FormularioPaisesComponent{
    @Output('refresh') refresh: EventEmitter<Pais> = new EventEmitter();
  protected form!: FormGroup;

  constructor(
    private paisesService: PaisesService,
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
      ]
    });
  }

  setForm(data: Pais) {
    this.form.patchValue(data);
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {

    //console.log(this.form.value);
    if (this.form.value.id) {
      this.paisesService.update(this.form.value as Pais).subscribe({
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
      this.paisesService.store(this.form.value as Pais).subscribe({
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