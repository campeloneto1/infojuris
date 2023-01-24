import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { FormularioNaturezasComponent } from "./formulario/formulario-naturezas.component";
import { Natureza, Naturezas } from "./naturezas";
import { NaturezasService } from "./naturezas.service";


@Component({
    selector: 'app-naturezas',
    templateUrl: './naturezas.component.html',
    styleUrls: ['./naturezas.component.css']
})

export class NaturezasComponent implements OnInit, OnDestroy{
    data$!: Observable<Naturezas>;
    excluir!: Natureza;

    @ViewChild(FormularioNaturezasComponent) child! : FormularioNaturezasComponent;
    @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Naturezas>();

  constructor( private sharedService: SharedService,
    private naturezasService: NaturezasService) {}

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 2,
            processing: true,
            responsive: true,
            order: [3, 'asc'],
          };

          this.data$ = this.naturezasService.index().pipe(tap(() => {
            this.dtTrigger.next(this.data$);
          }));
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
    
      refresh(){
        this.data$ = this.naturezasService.index().pipe(tap(() => {
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
    
      edit(data: Natureza){
        //console.log(data);
        this.child.setForm(data);
      }
    
      delete(data: Natureza){
        this.excluir = data;
      }
    
      confirm(id?: number){
        this.naturezasService.destroy(id || 0).subscribe({
          next: (data) => {
            this.sharedService.toast('Sucesso!', data as string , 3);
            this.excluir = {} as Natureza;
            this.refresh();
          },
          error: (error) => {
            this.sharedService.toast('Error!', error.erro as string , 2);
          }
        })
      }
}