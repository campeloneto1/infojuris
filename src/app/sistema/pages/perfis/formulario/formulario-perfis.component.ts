import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { Perfil } from "../perfis";
import { PerfisService } from "../perfis.service";

@Component({
    selector: 'app-formulario-perfis',
    templateUrl: './formulario-perfis.component.html',
    styleUrls: ['./formulario-perfis.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule], 
})

export class FormularioPerfisComponent{
    @Output('refresh') refresh: EventEmitter<Perfil> = new EventEmitter();
  protected form!: FormGroup;

  constructor(
    private perfisService: PerfisService,
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
      administrador: [0],
      gestor: [0],

      audiencias: [0],
      audiencias_cad: [0],
      audiencias_edt: [0],
      audiencias_del: [0],

      filiais: [0],
      filiais_cad: [0],
      filiais_edt: [0],
      filiais_del: [0],

      lancamentos: [0],
      lancamentos_cad: [0],
      lancamentos_edt: [0],
      lancamentos_del: [0],

      pessoas: [0],
      pessoas_cad: [0],
      pessoas_edt: [0],
      pessoas_del: [0],

      processos: [0],
      processos_cad: [0],
      processos_edt: [0],
      processos_del: [0],

      usuarios: [0],
      usuarios_cad: [0],
      usuarios_edt: [0],
      usuarios_del: [0],
    });
  }

  setForm(data: Perfil) {
    this.form.patchValue(data);
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    //console.log(this.form.value);
    if (this.form.value.id) {
      this.perfisService.update(this.form.value as Perfil).subscribe({
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
      this.perfisService.store(this.form.value as Perfil).subscribe({
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