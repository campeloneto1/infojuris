import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { Escritorios } from "../../escritorios/escritorios";
import { EscritoriosService } from "../../escritorios/escritorios.service";
import { Lancamento } from "../lancamentos";
import { LancamentosService } from "../lancamentos.service";

@Component({
    selector: 'app-formulario-lancamentos',
    templateUrl: './formulario-lancamentos.component.html',
    styleUrls: ['./formulario-lancamentos.component.css']
})

export class FormularioLancamentosComponent{
    @Output('refresh') refresh: EventEmitter<Lancamento> = new EventEmitter();
    protected form!: FormGroup;
  
    protected escritorios$!: Observable<Escritorios>;

  
    constructor(
      private escritoriosService: EscritoriosService,
      private lancamentosService: LancamentosService,
      private sharedService: SharedService,
      private formBuilder: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.form = this.formBuilder.group({
        id: [''],
        escritorio_id: ['', [Validators.required]],
        codigo: [''],
        valor: [''],
        valor_liquido: [''],
        valor_pago: [''],
        data_vencimento: [ '', [ Validators.required ] ],
        data_pagamento: [ ''],
        desconto: [ '' ],
        porcentagem: [ '' ],
        pagseguro_id: [ '' ],
        status: [ '' ],
      });
  
  
      this.escritorios$ = this.escritoriosService.index();
   
    }

    setForm(data: Lancamento) {
      this.form.patchValue(data);
    }
  
    resetar() {
      this.form.reset();
    }
  
    cadastrar() {
      //console.log(this.form.value);
      if (this.form.value.id) {
        this.lancamentosService.update(this.form.value as Lancamento).subscribe({
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
        this.lancamentosService.store(this.form.value as Lancamento).subscribe({
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