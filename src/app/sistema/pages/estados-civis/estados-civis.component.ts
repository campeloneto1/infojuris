import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { TituloModule } from "../../components/titulo/titulo.module";
import { EstadoCivil, EstadosCivis } from "./estados-civis";
import { EstadosCivisService } from "./estados-civis.service";
import { FormularioEstadosCivisComponent } from "./formulario/formulario-estados-civis.component";

@Component({
    selector: 'app-estados-civis',
    templateUrl: './estados-civis.component.html',
    styleUrls: ['./estados-civis.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule, TituloModule, FormularioEstadosCivisComponent], 
})

export class EstadosCivisComponent{
    data$!: Observable<EstadosCivis>;
    excluir!: EstadoCivil;

    @ViewChild(FormularioEstadosCivisComponent) child! : FormularioEstadosCivisComponent;
    @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<EstadosCivis>();

  constructor( private sharedService: SharedService,
    private estadosCivisService: EstadosCivisService) {}

    ngOnInit(): void {
      this.dtOptions = this.sharedService.getDtOptions();
      this.dtOptions = {...this.dtOptions, order: [1, 'asc']}

      this.data$ = this.estadosCivisService.index().pipe(tap(() => {
        this.dtTrigger.next(this.dtOptions);
      }));
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
    
      refresh(){
        this.data$ = this.estadosCivisService.index().pipe(tap(() => {
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
    
      edit(data: EstadoCivil){
        //console.log(data);
        this.child.setForm(data);
      }
    
      delete(data: EstadoCivil){
        this.excluir = data;
      }
    
      confirm(id?: number){
        this.estadosCivisService.destroy(id || 0).subscribe({
          next: (data) => {
            this.sharedService.toast('Sucesso!', data as string , 3);
            this.excluir = {} as EstadoCivil;
            this.refresh();
          },
          error: (error) => {
            this.sharedService.toast('Error!', error.erro as string , 2);
          }
        })
      }
}