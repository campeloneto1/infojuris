import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EscritoriosService } from '../../escritorios/escritorios.service';
import { Escritorio, Escritorios } from '../../escritorios/escritorios';
import { Observable } from 'rxjs';
import { PerfisService } from '../../perfis/perfis.service';
import { Perfil, Perfis } from '../../perfis/perfis';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../usuarios';
import { UsuariosService } from '../usuarios.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-formulario-usuarios',
  templateUrl: './formulario-usuarios.component.html',
  styleUrls: ['./formulario-usuarios.component.css'],
})
export class FomularioUsuariosComponent implements OnInit {
  escritorios$!: Observable<Escritorios>;
  perfis$!: Observable<Perfis>;

  @Output('refresh') refresh: EventEmitter<Usuario> = new EventEmitter();
  protected form!: FormGroup;

  

  constructor(
    private escritoriosService: EscritoriosService,
    private perfisService: PerfisService,
    private usuariosService: UsuariosService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.escritorios$ = this.escritoriosService.index();
    this.perfis$ = this.perfisService.index();

    

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
      cpf: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
      ],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      telefone1: [
        '',
        Validators.compose([Validators.required, Validators.minLength(11)]),
      ],
      telefone2: ['', [Validators.minLength(11)]],
      escritorio_id: ['' , [Validators.required]],
      perfil_id: ['' , [Validators.required]],
    });
  }

  setForm(data: Usuario) {
    this.form.patchValue(data);
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    //console.log(this.form.value as Usuario);
    if (this.form.value.id) {
      this.usuariosService.update(this.form.value as Usuario).subscribe({
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
      this.usuariosService.store(this.form.value as Usuario).subscribe({
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

  editar(data: Usuario) {
    this.form.patchValue(data);
  }
}
