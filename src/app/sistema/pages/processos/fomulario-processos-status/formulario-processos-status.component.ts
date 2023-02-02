import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { Status, Statuss } from "../../status/status";
import { StatusService } from "../../status/status.service";
import { Processo } from "../processos";
import { ProcessosService } from "../processos.service";

@Component({
    selector: 'app-formulario-processos-status',
    templateUrl : './formulario-processos-status.component.html',
    styleUrls: ['./formulario-processos-status.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule], 
})

export class FormularioProcessosStatusComponent{
    @Output('refresh') refresh: EventEmitter<Processo> = new EventEmitter();
    @Input() processo_id!: number;
    @Input() status!: Status;

  protected form!: FormGroup;
  protected status$!: Observable<Statuss>;

  protected config!: any

  constructor(
    private processosService: ProcessosService,
    private statusService: StatusService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],      
      status_id: [''], 
      status: ['', [Validators.required]],     
    });

    this.status$ = this.statusService.index();
    if(this.status){
      this.form.get('status')?.patchValue(this.status);
    }

    this.config = this.sharedService.getConfig();
    this.config = {...this.config, displayFn:(item: Status) => { return `${item.nome}`; }, placeholder:'Status'};
  }

  setForm(data: Processo) {
    this.form.patchValue(data);    
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    if(this.form.value.status){
      this.form.get('status_id')?.patchValue(this.form.value.status.id);
      this.form.get('status')?.patchValue('');
    }

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