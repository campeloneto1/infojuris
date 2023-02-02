import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { Pessoa, Pessoas } from "../../pessoas/pessoas";
import { PessoasService } from "../../pessoas/pessoas.service";
import { ProcessoPessoa } from "../processos-pessoas";
import { ProcessosPessoasService } from "../processos-pessoas.service";

@Component({
    selector: 'app-formulario-processos-pessoas',
    templateUrl: './formulario-processos-pessoas.component.html',
    styleUrls: ['./formulario-processos-pessoas.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule], 
})
export class FormularioProcessosPessoasComponent{
    @Output('refresh2') refresh2: EventEmitter<ProcessoPessoa> = new EventEmitter();
    @Input() processo_id!: number;
    @Input() tipo_id!: number;

  protected form!: FormGroup;
  protected pessoas$!: Observable<Pessoas>;

  protected config!: any

  constructor(
    private processosPessoasService: ProcessosPessoasService,
    private pessoasService: PessoasService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      processo_id: [''],
      pessoa_id: [''],     
      pessoa: ['', [Validators.required]],     
      tipo_id: [''],
    });

    this.pessoas$ = this.pessoasService.index();

    this.config = this.sharedService.getConfig();
    this.config = {...this.config, displayFn:(item: Pessoa) => { return item.nome+' ('+item.cpf+')'; }, placeholder:'Pessoa'};
  }

  setForm(data: ProcessoPessoa) {
    this.form.patchValue(data);    
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {

    if(this.form.value.pessoa){
      this.form.get('pessoa_id')?.patchValue(this.form.value.pessoa.id);
      this.form.get('pessoa')?.patchValue('');
    }
   
    if(!this.form.value.processo_id){
        this.form.get('processo_id')?.patchValue(this.processo_id);
    }

    if(!this.form.value.tipo_id){
      this.form.get('tipo_id')?.patchValue(this.tipo_id);
  }
    
    //console.log(this.form.value);
    if (this.form.value.id) {
      this.processosPessoasService.update(this.form.value as ProcessoPessoa).subscribe({
        next: (data) => {
          this.sharedService.toast('Sucesso!', data as string, 3);
          this.form.reset();
          this.refresh2.emit();
        },
        error: (error) => {
          this.sharedService.toast('Error!', error.erro as string, 2);
        },
      });
    } else {
      this.processosPessoasService.store(this.form.value as ProcessoPessoa).subscribe({
        next: (data) => {
          this.sharedService.toast('Sucesso!', data as string, 1);
          this.form.reset();
          this.refresh2.emit();
        },
        error: (error) => {
          this.sharedService.toast('Error!', error.erro as string, 2);
        },
      });
    }
  }
}