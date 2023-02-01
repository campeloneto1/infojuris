import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { FormularioOcupacoesComponent } from "./formulario/formulario-ocupacoes.component";
import { Ocupacao, Ocupacoes } from "./ocupacoes";
import { OcupacoesService } from "./ocupacoes.service";

@Component({
    selector: 'app-ocupacoes',
    templateUrl: './ocupacoes.component.html',
    styleUrls: ['./ocupacoes.component.css']
})

export class OcupacoesComponent implements OnInit, OnDestroy{
   
    data$!: Observable<Ocupacoes>;
    excluir!: Ocupacao;

    @ViewChild(FormularioOcupacoesComponent) child! : FormularioOcupacoesComponent;
    @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};

     // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Ocupacoes>();

  constructor( private sharedService: SharedService,
    private ocupacoesService: OcupacoesService) {}

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            responsive: true,
            order: [1, 'asc'],
          };

          this.data$ = this.ocupacoesService.index().pipe(tap(() => {
            this.dtTrigger.next(this.dtOptions);
          }));
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }

      refresh(){
        this.data$ = this.ocupacoesService.index().pipe(tap(() => {
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
    
      edit(data: Ocupacao){
        //console.log(data);
        this.child.setForm(data);
      }
    
      delete(data: Ocupacao){
        this.excluir = data;
      }
    
      confirm(id?: number){
        this.ocupacoesService.destroy(id || 0).subscribe({
          next: (data) => {
            this.sharedService.toast('Sucesso!', data as string , 3);
            this.excluir = {} as Ocupacao;
            this.refresh();
          },
          error: (error) => {
            this.sharedService.toast('Error!', error.erro as string , 2);
          }
        })
      }

}