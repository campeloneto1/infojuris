import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { Status, Statuss } from "../../status/status";
import { StatusService } from "../../status/status.service";
import { Processo } from "../processos";
import { ProcessosService } from "../processos.service";

@Component({
    selector: 'app-formulario-processos-status',
    templateUrl : './formulario-processos-status.component.html',
    styleUrls: ['./formulario-processos-status.component.css']
})

export class FormularioProcessosStatusComponent{
    @Output('refresh') refresh: EventEmitter<Processo> = new EventEmitter();
    @Input() processo_id!: number;
    @Input() status_id!: number;

  protected form!: FormGroup;
  protected status$!: Observable<Statuss>;

  constructor(
    private processosService: ProcessosService,
    private statusService: StatusService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],      
      status_id: ['', [Validators.required]],     
    });

    this.status$ = this.statusService.index();
    if(this.status_id){
      this.form.get('status_id')?.patchValue(this.status_id);
    }
  }

  setForm(data: Processo) {
    this.form.patchValue(data);    
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    this.form.get('id')?.patchValue(this.processo_id);
    //console.log(this.form.value);
    if (this.form.value.id) {
      this.processosService.changeStatus(this.form.value as Processo).subscribe({
        next: (data) => {
          this.sharedService.toast('Sucesso!', data as string, 3);
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