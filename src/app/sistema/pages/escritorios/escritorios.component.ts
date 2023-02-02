import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DataTableDirective } from "angular-datatables";
import { Observable, Subject, tap } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { SharedService } from "src/app/shared/shared.service";
import { TituloModule } from "../../components/titulo/titulo.module";
import { Escritorio, Escritorios } from "./escritorios";
import { EscritoriosService } from "./escritorios.service";
import { FormularioEscritoriosComponent } from "./formulario/formulario-escritorios.component";

@Component({
    selector: 'app-escritorios',
    templateUrl: './escritorios.component.html',
    styleUrls: ['./escritorios.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule, TituloModule, FormularioEscritoriosComponent], 
})

export class EscritoriosComponent implements OnInit, OnDestroy{

    data$!: Observable<Escritorios>;
    excluir!: Escritorio;

    @ViewChild(FormularioEscritoriosComponent) child! : FormularioEscritoriosComponent;
    @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Escritorios>();

  constructor( private sharedService: SharedService,
    private escritoriosService: EscritoriosService) {}

    ngOnInit(): void {
      this.dtOptions = this.sharedService.getDtOptions();
      this.dtOptions = {...this.dtOptions, order: [1, 'asc']}
       
      this.data$ = this.escritoriosService.index().pipe(tap(() => {
        this.dtTrigger.next(this.dtOptions);
      }));
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }
    
      refresh(){
        this.data$ = this.escritoriosService.index().pipe(tap(() => {
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
    
      edit(data: Escritorio){
        //console.log(data);
        this.child.setForm(data);
      }
    
      delete(data: Escritorio){
        this.excluir = data;
      }
    
      confirm(id?: number){
        this.escritoriosService.destroy(id || 0).subscribe({
          next: (data) => {
            this.sharedService.toast('Sucesso!', data as string , 3);
            this.excluir = {} as Escritorio;
            this.refresh();
          },
          error: (error) => {
            this.sharedService.toast('Error!', error.erro as string , 2);
          }
        })
    }
}