import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EscritoriosService } from '../../escritorios/escritorios.service';
import { Escritorio, Escritorios } from '../../escritorios/escritorios';
import { Observable } from 'rxjs';
import { PerfisService } from '../../perfis/perfis.service';
import { Perfis } from '../../perfis/perfis';
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

  config = {
    displayFn: (item: Escritorio) => {
      return `${item.nome} (${item.cnpj})`;
    }, //to support flexible text displaying for each item
    displayKey: 'description', //if objects array passed which key to be displayed defaults to description
    search: true, //true/false for the search functionlity defaults to false,
    height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Escritório', // text to be displayed when no item is selected defaults to Select,
    //customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
    moreText: 'mais', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    noResultsFound: 'Não encontrado!', // text to be displayed when no items are found while searching
    searchPlaceholder: 'Pesquisar', // label thats displayed in search input,
    searchOnKey: 'nome', // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    clearOnSelection: false, // clears search criteria when an option is selected if set to true, default is false
    inputDirection: 'ltr', // the direction of the search input can be rtl or ltr(default)
    selectAllLabel: 'Select all', // label that is displayed in multiple selection for select all
    enableSelectAll: false, // enable select all option to select all available items, default is false
  };

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
      escritorio: ['', [Validators.required]],
      escritorio_id: [''],
      perfil_id: ['', [Validators.required]],
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
