import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { Cliente, Clientes } from "./clientes";
import { ClientesService } from "./clientes.service";
import { FormularioClientesComponent } from "./formulario/formulario-clientes.component";

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css']
})

export class ClientesComponent{
    data$!: Observable<Clientes>;
    excluir!: Cliente;

    @ViewChild(FormularioClientesComponent) child! : FormularioClientesComponent;
    @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Clientes>();

  constructor( private sharedService: SharedService,
    private clientesService: ClientesService) {}

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 2,
            processing: true,
            responsive: true,
            order: [3, 'asc'],
          };

          this.data$ = this.clientesService.index().pipe(tap(() => {
            this.dtTrigger.next(this.data$);
          }));
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
    
      refresh(){
        this.data$ = this.clientesService.index().pipe(tap(() => {
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
    
      edit(data: Cliente){
        //console.log(data);
        this.child.setForm(data);
      }
    
      delete(data: Cliente){
        this.excluir = data;
      }
    
      confirm(id?: number){
        this.clientesService.destroy(id || 0).subscribe({
          next: (data) => {
            this.sharedService.toast('Sucesso!', data as string , 3);
            this.excluir = {} as Cliente;
            this.refresh();
          },
          error: (error) => {
            this.sharedService.toast('Error!', error.erro as string , 2);
          }
        })
      }
}