import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { Pessoa } from "../pessoas/pessoas";
import { Audiencia, Audiencias } from "./audiencias";
import { AudienciasPessoasService } from "./audiencias-pessoas.service";
import { AudienciasService } from "./audiencias.service";
import { FormularioAudienciasComponent } from "./formulario/formulario-audiencias.component";

@Component({
    selector: 'app-audiencias',
    templateUrl: './audiencias.component.html',
    styleUrls: ['./audiencias.component.css']
})

export class AudienciasComponent{
    data$!: Observable<Audiencias>;
    excluir!: Audiencia;
    audiencia!: Audiencia;
    excluirPessoa!: Pessoa;
  
    cadtest = false;
    deltest = false;
    
  
    @ViewChild(FormularioAudienciasComponent) child!: FormularioAudienciasComponent;
    @ViewChild(DataTableDirective, { static: false })
    dtElement!: DataTableDirective;
  
    dtOptions: DataTables.Settings = {};
  
    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    dtTrigger: Subject<any> = new Subject<Audiencias>();
  
    constructor(
      private sharedService: SharedService,
      private audienciasService: AudienciasService,
      private audienciasPessoasService: AudienciasPessoasService,
    ) {}
  
    ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 2,
        processing: true,
        responsive: true,
        order: [3, 'asc'],
      };
  
      this.data$ = this.audienciasService.index().pipe(
        tap(() => {
          this.dtTrigger.next(this.data$);
        })
      );
    }
  
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
  
    refresh() {
      this.data$ = this.audienciasService.index().pipe(
        tap(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next(this.data$);
          });
        })
      );
  
      this.cadtest = false;
    }

    refresh2() {
      this.data$ = this.audienciasService.index().pipe(
        tap(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next(this.data$);
  
            this.audienciasService.show(this.audiencia.id || 0).subscribe(data => {
              this.audiencia = data;
            });
            
          });
        })
      );
      this.cadtest = false;
    }
  
  
    setAudiencia(data: Audiencia) {
      this.cadtest = false;
      this.audiencia = data;
    }

  
    resetarForm() {
      this.child.resetar();
    }
  
    edit(data: Audiencia) {
      //console.log(data);
      this.child.setForm(data);
    }
  
    delete(data: Audiencia) {
      this.excluir = data;
    }
  
    confirm(id?: number) {
      this.audienciasService.destroy(id || 0).subscribe({
        next: (data) => {
          this.sharedService.toast('Sucesso!', data as string, 3);
          this.excluir = {} as Audiencia;
          this.refresh();
        },
        error: (error) => {
          this.sharedService.toast('Error!', error.erro as string, 2);
        },
      });
    }

    deletePessoa(data: Pessoa) {
      this.deltest =  true;
      this.excluirPessoa = data;
    }
  
    confirmPessoa(id: number){
      //console.log(id);
      this.deltest = false;
      this.audienciasPessoasService.destroy(id).subscribe({
        next: (data) => {
          this.sharedService.toast('Sucesso!', data as string, 3);
          this.refresh();
          this.audienciasService.show(this.audiencia.id || 0).subscribe(data => {
            this.audiencia = data;
          });
        },
        error: (error) => {
          this.sharedService.toast('Error!', error.erro as string, 2);
        },
      });
    }
}