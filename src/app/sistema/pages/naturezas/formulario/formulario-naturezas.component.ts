import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { Natureza } from '../naturezas';
import { NaturezasService } from '../naturezas.service';

@Component({
  selector: 'app-formulario-naturezas',
  templateUrl: './formulario-naturezas.component.html',
  styleUrls: ['./formulario-naturezas.component.css'],
})
export class FormularioNaturezasComponent implements OnInit {
  @Output('refresh') refresh: EventEmitter<Natureza> = new EventEmitter();
  protected form!: FormGroup;

  constructor(
    private naturezasService: NaturezasService,
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

  setForm(data: Natureza) {
    this.form.patchValue(data);
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    //console.log(this.form.value as Usuario);
    if (this.form.value.id) {
      this.naturezasService.update(this.form.value as Natureza).subscribe({
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
      this.naturezasService.store(this.form.value as Natureza).subscribe({
        next: (data) => {
          this.sharedService.toast('Sucesso!', data as string, 1);
          this.form.reset();
          this.refresh.emit();
        },
        error: (error) => {
          //console.log(error)
          this.sharedService.toast('Error!', error.erro as string, 2);
        },
      });
    }
  }

  editar(data: Natureza) {
    this.form.patchValue(data);
  }
}
