import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedService } from "src/app/shared/shared.service";
import { FormularioPerfisComponent } from "./formulario/formulario-perfis.component";
import { Perfil, Perfis } from "./perfis";
import { PerfisService } from "./perfis.service";

@Component({
    selector: 'app-perfis',
    templateUrl: './perfis.component.html',
    styleUrls: ['./perfis.component.css']
})

export class PerfisComponent{
    data$!: Observable<Perfis>;
    excluir!: Perfil;

    @ViewChild(FormularioPerfisComponent) child! : FormularioPerfisComponent;
    @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Perfis>();

  constructor( private sharedService: SharedService,
    private perfisService: PerfisService) {}

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,
            responsive: true,
            order: [1, 'asc'],
          };

          this.data$ = this.perfisService.index().pipe(tap(() => {
            this.dtTrigger.next(this.dtOptions);
          }));
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
    
      refresh(){
        this.data$ = this.perfisService.index().pipe(tap(() => {
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
    
      edit(data: Perfil){
        //console.log(data);
        this.child.setForm(data);
      }
    
      delete(data: Perfil){
        this.excluir = data;
      }
    
      confirm(id?: number){
        this.perfisService.destroy(id || 0).subscribe({
          next: (data) => {
            this.sharedService.toast('Sucesso!', data as string , 3);
            this.excluir = {} as Perfil;
            this.refresh();
          },
          error: (error) => {
            this.sharedService.toast('Error!', error.erro as string , 2);
          }
        })
      }
}