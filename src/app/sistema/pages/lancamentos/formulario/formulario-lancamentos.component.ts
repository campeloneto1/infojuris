import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { Escritorio, Escritorios } from "../../escritorios/escritorios";
import { EscritoriosService } from "../../escritorios/escritorios.service";
import { Lancamento } from "../lancamentos";
import { LancamentosService } from "../lancamentos.service";

@Component({
    selector: 'app-formulario-lancamentos',
    templateUrl: './formulario-lancamentos.component.html',
    styleUrls: ['./formulario-lancamentos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule], 
})

export class FormularioLancamentosComponent{
    @Output('refresh') refresh: EventEmitter<Lancamento> = new EventEmitter();
    protected form!: FormGroup;
  
    protected escritorios$!: Observable<Escritorios>;

    protected config!: any
  
    constructor(
      private escritoriosService: EscritoriosService,
      private lancamentosService: LancamentosService,
      private sharedService: SharedService,
      private formBuilder: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.form = this.formBuilder.group({
        id: [''],
        escritorio: ['', [Validators.required]],
        escritorio_id: [''],
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

      this.config = this.sharedService.getConfig();
      this.config = {...this.config, displayFn:(item: Escritorio) => { return `${item.nome}`; }, placeholder:'Escritório'};

      this.escritorios$ = this.escritoriosService.index();
   
    }

    setForm(data: Lancamento) {
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