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
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-usuarios',
  templateUrl: './formulario-usuarios.component.html',
  styleUrls: ['./formulario-usuarios.component.css'],
  standalone: true,
  imports: [CommonModule, SharedModule], 
})
export class FomularioUsuariosComponent implements OnInit {
  escritorios$!: Observable<Escritorios>;
  perfis$!: Observable<Perfis>;

  @Output('refresh') refresh: EventEmitter<Usuario> = new EventEmitter();
  protected form!: FormGroup;

  protected config!: any
  protected config2!: any

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
      escritorio_id: ['' ],
      escritorio: ['' , [Validators.required]],
      perfil_id: [''],
      perfil: ['' , [Validators.required]],
    });

    this.config = this.sharedService.getConfig();
    this.config = {...this.config, displayFn:(item: Escritorio) => { return `${item.nome}`; }, placeholder:'Estritório'};

    this.config2 = this.sharedService.getConfig();
    this.config2 = {...this.config, displayFn:(item: Perfil) => { return `${item.nome}`; }, placeholder:'Perfil'};
  }

  setForm(data: Usuario) {
    this.form.patchValue(data);
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    if(this.form.value.escritorio){
      this.form.get('escritorio_id')?.patchValue(this.form.value.escritorio.id);
      this.form.get('escritorio')?.patchValue('');
    }

    if(this.form.value.perfil){
      this.form.get('perfil_id')?.patchValue(this.form.value.perfil.id);
      this.form.get('perfil')?.patchValue('');
    }
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
