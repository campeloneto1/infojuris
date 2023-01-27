import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { FormularioProcessosComponent } from "./formulario/formulario-processos.component";
import { Processo, Processos } from "./processos";
import { ProcessosService } from "./processos.service";

@Component({
    selector: 'app-processos',
    templateUrl: './processos.component.html',
    styleUrls: ['./processos.component.css']
})

export class ProcessosComponent{
    data$!: Observable<Processos>;
    excluir!: Processo;

    @ViewChild(FormularioProcessosComponent) child! : FormularioProcessosComponent;
    @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Processos>();

  constructor( private sharedService: SharedService,
    private processosService: ProcessosService) {}

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 2,
            processing: true,
            responsive: true,
            order: [3, 'asc'],
          };

          this.data$ = this.processosService.index().pipe(tap(() => {
            this.dtTrigger.next(this.data$);
          }));
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
    
      refresh(){
        this.data$ = this.processosService.index().pipe(tap(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next(this.data$);
          });
        }));;
        
        
        
      }

      resetarForm(){
        this.child.resetar();
      }
    
      edit(data: Processo){
        //console.log(data);
        this.child.setForm(data);
      }
    
      delete(data: Processo){
        this.excluir = data;
      }
    
      confirm(id?: number){
        this.processosService.destroy(id || 0).subscribe({
          next: (data) => {
            this.sharedService.toast('Sucesso!', data as string , 3);
            this.excluir = {} as Processo;
            this.refresh();
          },
          error: (error) => {
            this.sharedService.toast('Error!', error.erro as string , 2);
          }
        })
      }
}