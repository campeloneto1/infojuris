import { CommonModule } from "@angular/common";
import { Component, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { TituloModule } from "../../components/titulo/titulo.module";
import { FormularioVarasComponent } from "./formulario/formulario-varas.component";
import { Vara, Varas } from "./varas";
import { VarasService } from "./varas.service";

@Component({
    selector: 'app-varas',
    templateUrl: './varas.component.html',
    styleUrls: ['./varas.component.html'],
    standalone: true,
    imports: [CommonModule, SharedModule, TituloModule, FormularioVarasComponent], 
})

export class VarasComponent{
    data$!: Observable<Varas>;
    excluir!: Vara;

    @ViewChild(FormularioVarasComponent) child! : FormularioVarasComponent;
    @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Varas>();

  constructor( private sharedService: SharedService,
    private varasService: VarasService) {}

    ngOnInit(): void {
      this.dtOptions = this.sharedService.getDtOptions();
      this.dtOptions = {...this.dtOptions, order: [[1, 'asc'],[2, 'asc'],[3, 'asc']]}
       
          this.data$ = this.varasService.index().pipe(tap(() => {
            this.dtTrigger.next(this.dtOptions);
          }));
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
    
      refresh(){
        this.data$ = this.varasService.index().pipe(tap(() => {
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
    
      edit(data: Vara){
        //console.log(data);
        this.child.setForm(data);
      }
    
      delete(data: Vara){
        this.excluir = data;
      }
    
      confirm(id?: number){
        this.varasService.destroy(id || 0).subscribe({
          next: (data) => {
            this.sharedService.toast('Sucesso!', data as string , 3);
            this.excluir = {} as Vara;
            this.refresh();
          },
          error: (error) => {
            this.sharedService.toast('Error!', error.erro as string , 2);
          }
        })
      }
}