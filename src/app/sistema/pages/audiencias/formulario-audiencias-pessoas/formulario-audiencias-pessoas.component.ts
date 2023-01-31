import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { Pessoas } from "../../pessoas/pessoas";
import { PessoasService } from "../../pessoas/pessoas.service";
import { AudienciaPessoa } from "../audiencias-pessoas";
import { AudienciasPessoasService } from "../audiencias-pessoas.service";

@Component({
    selector: 'app-formulario-audiencias-pessoas',
    templateUrl: './formulario-audiencias-pessoas.component.html',
    styleUrls: ['./formulario-audiencias-pessoas.component.css']
})

export class FormularioAudienciasPessoasComponent implements OnInit{
    @Output('refresh2') refresh2: EventEmitter<AudienciaPessoa> = new EventEmitter();
    @Input() audiencia_id!: number;

  protected form!: FormGroup;
  protected pessoas$!: Observable<Pessoas>;

  constructor(
    private audienciasPessoasService: AudienciasPessoasService,
    private pessoasService: PessoasService,
    private sharedService: SharedService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      audiencia_id: [''],
      pessoa_id: ['', [Validators.required]],     
    });

    this.pessoas$ = this.pessoasService.index();
   
  }

  setForm(data: AudienciaPessoa) {
    this.form.patchValue(data);    
  }

  resetar() {
    this.form.reset();
  }

  cadastrar() {
    if(!this.form.value.audiencia_id){
        this.form.get('audiencia_id')?.patchValue(this.audiencia_id);
    }

    
    
    //console.log(this.form.value);
    if (this.form.value.id) {
      this.audienciasPessoasService.update(this.form.value as AudienciaPessoa).subscribe({
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
      this.audienciasPessoasService.store(this.form.value as AudienciaPessoa).subscribe({
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