import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { Filiais, Filial } from "./filiais";
import { FiliaisService } from "./filiais.service";
import { FormularioFiliaisComponent } from "./formulario/formulario-filiais.component";

@Component({
    selector: 'app-filiais',
    templateUrl: './filiais.component.html',
    styleUrls: ['./filiais.component.css']
})

export class FiliaisComponent{
    data$!: Observable<Filiais>;
    excluir!: Filial;

    @ViewChild(FormularioFiliaisComponent) child! : FormularioFiliaisComponent;
    @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Filiais>();

  constructor( private sharedService: SharedService,
    private filiaisService: FiliaisService) {}

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            responsive: true,
            order: [[1, 'asc'],[2, 'asc']],
          };

          this.data$ = this.filiaisService.index().pipe(tap(() => {
            this.dtTrigger.next(this.dtOptions);
          }));
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
    
      refresh(){
        this.data$ = this.filiaisService.index().pipe(tap(() => {
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
    
      edit(data: Filial){
        //console.log(data);
        this.child.setForm(data);
      }
    
      delete(data: Filial){
        this.excluir = data;
      }
    
      confirm(id?: number){
        this.filiaisService.destroy(id || 0).subscribe({
          next: (data) => {
            this.sharedService.toast('Sucesso!', data as string , 3);
            this.excluir = {} as Filial;
            this.refresh();
          },
          error: (error) => {
            this.sharedService.toast('Error!', error.erro as string , 2);
          }
        })
      }
}