import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { Estado, Estados } from "./estados";
import { EstadosService } from "./estados.service";
import { FormularioEstadosComponent } from "./formulario/formulario-estados.component";

@Component({
    selector: 'app-estados',
    templateUrl: './estados.component.html',
    styleUrls: ['./estados.component.css']
})

export class EstadosComponent{
    data$!: Observable<Estados>;
    excluir!: Estado;

    @ViewChild(FormularioEstadosComponent) child! : FormularioEstadosComponent;
    @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Estados>();

  constructor( private sharedService: SharedService,
    private estadosService: EstadosService) {}

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            responsive: true,
            order: [2, 'asc'],
          };

          this.data$ = this.estadosService.index().pipe(tap(() => {
            this.dtTrigger.next(this.dtOptions);
          }));
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
    
      refresh(){
        this.data$ = this.estadosService.index().pipe(tap(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next(this.dtOptions);
          });
        }));;
        
        
        
      }

      resetarForm(){
        this.child.resetar();
      }
    
      edit(data: Estado){
        //console.log(data);
        this.child.setForm(data);
      }
    
      delete(data: Estado){
        this.excluir = data;
      }
    
      confirm(id?: number){
        this.estadosService.destroy(id || 0).subscribe({
          next: (data) => {
            this.sharedService.toast('Sucesso!', data as string , 3);
            this.excluir = {} as Estado;
            this.refresh();
          },
          error: (error) => {
            this.sharedService.toast('Error!', error.erro as string , 2);
          }
        })
      }
}