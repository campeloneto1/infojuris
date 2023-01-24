import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "src/app/shared/shared.service";
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
      pais_id: [''],
      pais: [''],
      estado_id: [''],
      estado: [''],
      cidade_id: [''],
      cidade: [''],
      complemento: [''],
      cep: [''],
    });
  }

  setForm(data: Tribunal) {
    this.form.patchValue(data);
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

  editar(data: Tribunal) {
    this.form.patchValue(data);
  }
}