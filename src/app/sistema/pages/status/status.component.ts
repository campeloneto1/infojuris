import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { FormularioStatusComponent } from "./formulario/formulario-status.component";
import { Status, Statuss } from "./status";
import { StatusService } from "./status.service";

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.css']
})

export class StatusComponent{
    data$!: Observable<Statuss>;
    excluir!: Status;

    @ViewChild(FormularioStatusComponent) child! : FormularioStatusComponent;
    @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Statuss>();

  constructor( private sharedService: SharedService,
    private statusService: StatusService) {}

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            responsive: true,
            order: [1, 'asc'],
          };

          this.data$ = this.statusService.index().pipe(tap(() => {
            this.dtTrigger.next(this.dtOptions);
          }));
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
    
      refresh(){
        this.data$ = this.statusService.index().pipe(tap(() => {
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
    
      edit(data: Status){
        //console.log(data);
        this.child.setForm(data);
      }
    
      delete(data: Status){
        this.excluir = data;
      }
    
      confirm(id?: number){
        this.statusService.destroy(id || 0).subscribe({
          next: (data) => {
            this.sharedService.toast('Sucesso!', data as string , 3);
            this.excluir = {} as Status;
            this.refresh();
          },
          error: (error) => {
            this.sharedService.toast('Error!', error.erro as string , 2);
          }
        })
      }
}