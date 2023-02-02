import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { TituloModule } from "../../components/titulo/titulo.module";
import { Comarca, Comarcas } from "./comarcas";
import { ComarcasService } from "./comarcas.service";
import { FormularioComarcasComponent } from "./formulario/formulario-comarcas.component";

@Component({
    selector: 'app-comarcas',
    templateUrl: './comarcas.component.html',
    styleUrls: ['./comarcas.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule, TituloModule, FormularioComarcasComponent], 
})

export class ComarcasComponent{
    data$!: Observable<Comarcas>;
    excluir!: Comarca;

    @ViewChild(FormularioComarcasComponent) child! : FormularioComarcasComponent;
    @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Comarcas>();

  constructor( private sharedService: SharedService,
    private comarcasService: ComarcasService) {}

    ngOnInit(): void {
      this.dtOptions = this.sharedService.getDtOptions();
      this.dtOptions = {...this.dtOptions, order: [[1, 'asc'],[2, 'asc']]}

      this.data$ = this.comarcasService.index().pipe(tap(() => {
        this.dtTrigger.next(this.dtOptions);
      }));
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
    
      refresh(){
        this.data$ = this.comarcasService.index().pipe(tap(() => {
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
    
      edit(data: Comarca){
        //console.log(data);
        this.child.setForm(data);
      }
    
      delete(data: Comarca){
        this.excluir = data;
      }
    
      confirm(id?: number){
        this.comarcasService.destroy(id || 0).subscribe({
          next: (data) => {
            this.sharedService.toast('Sucesso!', data as string , 3);
            this.excluir = {} as Comarca;
            this.refresh();
          },
          error: (error) => {
            this.sharedService.toast('Error!', error.erro as string , 2);
          }
        })
      }
}