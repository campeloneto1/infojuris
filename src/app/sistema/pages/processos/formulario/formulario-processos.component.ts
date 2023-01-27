import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { Clientes } from "../../clientes/clientes";
import { ClientesService } from "../../clientes/clientes.service";
import { Comarcas } from "../../comarcas/comarcas";
import { Naturezas } from "../../naturezas/naturezas";
import { NaturezasService } from "../../naturezas/naturezas.service";
import { Tribunais } from "../../tribunais/tribunais";
import { Varas } from "../../varas/varas";
import { Processo } from "../processos";
import { ProcessosService } from "../processos.service";

@Component({
    selector: 'app-formulario-processos',
    templateUrl: './formulario-processos.component.html',
    styleUrls: ['./formulario-processos.component.css']
})

export class FormularioProcessosComponent{
    @Output('refresh') refresh: EventEmitter<Processo> = new EventEmitter();
  protected form!: FormGroup;

  protected clientes$!: Observable<Clientes>;
  protected tribunais$!: Observable<Tribunais>;
  protected comarcas$!: Observable<Comarcas>;
  protected varas$!: Observable<Varas>;
  protected naturezas$!: Observable<Naturezas>;

  constructor(
    private processosService: ProcessosService,
    private clientesService: ClientesService,
    private naturezasService: NaturezasService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      escritorio_id: [''],
      natureza_id: ['', [Validators.required]],
      tribunal_id: ['', [Validators.required]],
      comarca_id: ['', [Validators.required]],
      vara_id: ['', [Validators.required]],
      autor_id: ['', [Validators.required]],
      reu_id: ['', [Validators.required]],
      codigo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(25),
        ]),
      ],
      valor: [ '', [ Validators.required ] ],
      data: [ '', [ Validators.required ] ],
      obs: [ '' ],
    });

    this.tribunais$ = this.sharedService.getTribunais();
    this.clientes$ = this.clientesService.index();
    this.naturezas$ = this.naturezasService.index();
 
  }

  getComarcas() {
    if (this.form.value.tribunal_id) {
      this.comarcas$ = this.sharedService.getComarcas(this.form.value.tribunal_id);
    }
  }

  getVaras() {
    if (this.form.value.comarca_id) {
      this.varas$ = this.sharedService.getVaras(this.form.value.comarca_id);
    }
  }

  setForm(data: Processo) {
    this.form.patchValue(data);
    if (data.vara.comarca_id) {
        this.form.get('comarca_id')?.patchValue(data.vara.comarca_id);
        this.comarcas$ = this.sharedService.getComarcas(data.vara.comarca.tribunal_id);
      }
      if (data.vara_id) {
       
        this.varas$ = this.sharedService.getVaras(data.vara.comarca_id);
      }

      if (data.vara.comarca.tribunal_id) {
        this.form.get('tribunal_id')?.patchValue(data.vara.comarca.tribunal_id);
      }
   
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    //console.log(this.form.value);
    if (this.form.value.id) {
      this.processosService.update(this.form.value as Processo).subscribe({
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
      this.processosService.store(this.form.value as Processo).subscribe({
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