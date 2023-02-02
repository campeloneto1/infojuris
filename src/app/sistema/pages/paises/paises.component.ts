import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { TituloModule } from "../../components/titulo/titulo.module";
import { FormularioPaisesComponent } from "./formulario/formulario-paises.component";
import { Pais, Paises } from "./paises";
import { PaisesService } from "./paises.service";

@Component({
    selector: 'app-paises',
    templateUrl: './paises.component.html',
    styleUrls: ['./paises.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule, TituloModule, FormularioPaisesComponent], 
})

export class PaisesComponent{
    data$!: Observable<Paises>;
    excluir!: Pais;

    @ViewChild(FormularioPaisesComponent) child! : FormularioPaisesComponent;
    @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Paises>();

  constructor( private sharedService: SharedService,
    private paisesService: PaisesService) {}

    ngOnInit(): void {
      this.dtOptions = this.sharedService.getDtOptions();
      this.dtOptions = {...this.dtOptions, order: [1, 'asc']}

          this.data$ = this.paisesService.index().pipe(tap(() => {
            this.dtTrigger.next(this.dtOptions);
          }));
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
    
      refresh(){
        this.data$ = this.paisesService.index().pipe(tap(() => {
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
    
      edit(data: Pais){
        //console.log(data);
        this.child.setForm(data);
      }
    
      delete(data: Pais){
        this.excluir = data;
      }
    
      confirm(id?: number){
        this.paisesService.destroy(id || 0).subscribe({
          next: (data) => {
            this.sharedService.toast('Sucesso!', data as string , 3);
            this.excluir = {} as Pais;
            this.refresh();
          },
          error: (error) => {
            this.sharedService.toast('Error!', error.erro as string , 2);
          }
        })
      }
}