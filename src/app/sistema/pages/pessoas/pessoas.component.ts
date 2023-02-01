import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { Pessoa, Pessoas } from "./pessoas";
import { PessoasService } from "./pessoas.service";
import { FormularioPessoasComponent } from "./formulario/formulario-pessoas.component";

@Component({
    selector: 'app-Pessoas',
    templateUrl: './pessoas.component.html',
    styleUrls: ['./pessoas.component.css']
})

export class PessoasComponent{
    data$!: Observable<Pessoas>;
    excluir!: Pessoa;

    @ViewChild(FormularioPessoasComponent) child! : FormularioPessoasComponent;
    @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Pessoas>();

  constructor( private sharedService: SharedService,
    private PessoasService: PessoasService) {}

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            responsive: true,
            order: [2, 'asc'],
          };

          this.data$ = this.PessoasService.index().pipe(tap(() => {
            this.dtTrigger.next(this.dtOptions);
          }));
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
    
      refresh(){
        this.data$ = this.PessoasService.index().pipe(tap(() => {
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
    
      edit(data: Pessoa){
        //console.log(data);
        this.child.setForm(data);
      }
    
      delete(data: Pessoa){
        this.excluir = data;
      }
    
      confirm(id?: number){
        this.PessoasService.destroy(id || 0).subscribe({
          next: (data) => {
            this.sharedService.toast('Sucesso!', data as string , 3);
            this.excluir = {} as Pessoa;
            this.refresh();
          },
          error: (error) => {
            this.sharedService.toast('Error!', error.erro as string , 2);
          }
        })
      }
}