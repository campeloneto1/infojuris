import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { FormularioTribunaisComponent } from "./formulario/formulario-tribunais.component";
import { Tribunais, Tribunal } from "./tribunais";
import { TribunaisService } from "./tribunais.service";

@Component({
    selector: 'app-tribunais',
    templateUrl: './tribunais.component.html',
    styleUrls: ['./tribunais.component.css']
})

export class TribunaisComponent{
    data$!: Observable<Tribunais>;
    excluir!: Tribunal;

    @ViewChild(FormularioTribunaisComponent) child! : FormularioTribunaisComponent;
    @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Tribunais>();

  constructor( private sharedService: SharedService,
    private tribunaisService: TribunaisService) {}

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 2,
            processing: true,
            responsive: true,
            order: [3, 'asc'],
          };

          this.data$ = this.tribunaisService.index().pipe(tap(() => {
            this.dtTrigger.next(this.data$);
          }));
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
    
      refresh(){
        this.data$ = this.tribunaisService.index().pipe(tap(() => {
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
    
      edit(data: Tribunal){
        //console.log(data);
        this.child.setForm(data);
      }
    
      delete(data: Tribunal){
        this.excluir = data;
      }
    
      confirm(id?: number){
        this.tribunaisService.destroy(id || 0).subscribe({
          next: (data) => {
            this.sharedService.toast('Sucesso!', data as string , 3);
            this.excluir = {} as Tribunal;
            this.refresh();
          },
          error: (error) => {
            this.sharedService.toast('Error!', error.erro as string , 2);
          }
        })
      }
}