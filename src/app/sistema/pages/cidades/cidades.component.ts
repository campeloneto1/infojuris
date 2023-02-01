import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { Cidade, Cidades } from "./cidades";
import { CidadesService } from "./cidades.service";
import { FormularioCidadesComponent } from "./formulario/formulario-cidades.component";

@Component({
    selector: 'app-cidades',
    templateUrl: './cidades.component.html',
    styleUrls: ['./cidades.component.css']
})

export class CidadesComponent{
    data$!: Observable<Cidades>;
    excluir!: Cidade;

    @ViewChild(FormularioCidadesComponent) child! : FormularioCidadesComponent;
    @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor( private sharedService: SharedService,
    private cidadesService: CidadesService) {}

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            responsive: true,
            order: [[2, 'asc'],[3, 'asc']],
          };

          this.data$ = this.cidadesService.index().pipe(tap(() => {
            this.dtTrigger.next(this.dtOptions);
          }));
          
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
    
      refresh(){
        this.data$ = this.cidadesService.index().pipe(tap(() => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next(this.dtOptions);
          });
        }));
        
       
        
      }

      resetarForm(){
        this.child.resetar();
      }
    
      edit(data: Cidade){
        //console.log(data);
        this.child.setForm(data);
      }
    
      delete(data: Cidade){
        this.excluir = data;
      }
    
      confirm(id?: number){
        this.cidadesService.destroy(id || 0).subscribe({
          next: (data) => {
            this.sharedService.toast('Sucesso!', data as string , 3);
            this.excluir = {} as Cidade;
            this.refresh();
          },
          error: (error) => {
            this.sharedService.toast('Error!', error.erro as string , 2);
          }
        })
      }
}