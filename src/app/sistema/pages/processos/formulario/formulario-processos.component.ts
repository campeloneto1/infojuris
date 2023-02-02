import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { Comarca, Comarcas } from "../../comarcas/comarcas";
import { Natureza, Naturezas } from "../../naturezas/naturezas";
import { NaturezasService } from "../../naturezas/naturezas.service";
import { Tribunais, Tribunal } from "../../tribunais/tribunais";
import { Vara, Varas } from "../../varas/varas";
import { Processo } from "../processos";
import { ProcessosService } from "../processos.service";

@Component({
    selector: 'app-formulario-processos',
    templateUrl: './formulario-processos.component.html',
    styleUrls: ['./formulario-processos.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule], 
})

export class FormularioProcessosComponent{
    @Output('refresh') refresh: EventEmitter<Processo> = new EventEmitter();
  protected form!: FormGroup;

  protected tribunais$!: Observable<Tribunais>;
  protected comarcas$!: Observable<Comarcas>;
  protected varas$!: Observable<Varas>;
  protected naturezas$!: Observable<Naturezas>;

  protected config!: any
  protected config2!: any
  protected config3!: any
  protected config4!: any

  constructor(
    private processosService: ProcessosService,
    private naturezasService: NaturezasService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      escritorio_id: [''],
      natureza_id: [''],
      natureza: ['', [Validators.required]],
      tribunal_id: [''],
      tribunal: ['', [Validators.required]],
      comarca_id: [''],
      comarca: ['', [Validators.required]],
      vara_id: [''],
      vara: ['', [Validators.required]],
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

    this.config = this.sharedService.getConfig();
    this.config = {...this.config, displayFn:(item: Natureza) => { return `${item.nome}`; }, placeholder:'Natureza'};

    this.config2 = this.sharedService.getConfig();
    this.config2 = {...this.config, displayFn:(item: Tribunal) => { return `${item.nome}`; }, placeholder:'Tribunal'};

    this.config3 = this.sharedService.getConfig();
    this.config3 = {...this.config, displayFn:(item: Comarca) => { return `${item.nome}`; }, placeholder:'Comarca'};

    this.config4 = this.sharedService.getConfig();
    this.config4 = {...this.config, displayFn:(item: Vara) => { return `${item.nome}`; }, placeholder:'Vara'};

    this.tribunais$ = this.sharedService.getTribunais();
    this.naturezas$ = this.naturezasService.index();
 
  }

  getComarcas() {
    if (this.form.value.tribunal) {
      this.comarcas$ = this.sharedService.getComarcas(this.form.value.tribunal.id);
    }
  }

  getVaras() {
    if (this.form.value.comarca) {
      this.varas$ = this.sharedService.getVaras(this.form.value.comarca.id);
    }
  }

  setForm(data: Processo) {
    this.form.patchValue(data);
      if (data.vara.comarca_id) {
        this.form.get('comarca')?.patchValue(data.vara.comarca);
        this.comarcas$ = this.sharedService.getComarcas(data.vara.comarca.tribunal_id);
      }
      if (data.vara_id) {
       
        this.varas$ = this.sharedService.getVaras(data.vara.comarca_id);
      }

      if (data.vara.comarca.tribunal_id) {
        this.form.get('tribunal')?.patchValue(data.vara.comarca.tribunal);
      }
   
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    if(this.form.value.natureza){
      this.form.get('natureza_id')?.patchValue(this.form.value.natureza.id);
      this.form.get('natureza')?.patchValue('');
    }

    if(this.form.value.tribunal){
      this.form.get('tribunal_id')?.patchValue(this.form.value.tribunal.id);
      this.form.get('tribunal')?.patchValue('');
    }

    if(this.form.value.comarca){
      this.form.get('comarca_id')?.patchValue(this.form.value.comarca.id);
      this.form.get('comarca')?.patchValue('');
    }

    if(this.form.value.vara){
      this.form.get('vara_id')?.patchValue(this.form.value.vara.id);
      this.form.get('vara')?.patchValue('');
    }

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