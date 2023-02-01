import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Usuario, Usuarios } from './usuarios';
import { Observable, Subject, tap } from 'rxjs';
import { UsuariosService } from './usuarios.service';
import { FomularioUsuariosComponent } from './formulario/formulario-usuarios.component';
import { SharedService } from 'src/app/shared/shared.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  
})
export class UsuariosComponent implements OnInit, OnDestroy {
  data$!: Observable<Usuarios>;
  excluir!: Usuario;

  @ViewChild(FomularioUsuariosComponent) child! : FomularioUsuariosComponent;
  @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Usuarios>();

  constructor( private sharedService: SharedService,
    private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      processing: true,
      responsive: true,
      order: [2, 'asc'],
    };

    

    this.data$ = this.usuariosService.index().pipe(tap(() => {
      this.dtTrigger.next(this.dtOptions);
    }));

    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  refresh(){
    this.data$ = this.usuariosService.index().pipe(tap(() => {
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

  edit(data: Usuario){
    //console.log(data);
    this.child.setForm(data);
  }

  delete(data: Usuario){
    this.excluir = data;
  }

  confirm(id?: number){
    this.usuariosService.destroy(id || 0).subscribe({
      next: (data) => {
        this.sharedService.toast('Sucesso!', data as string , 3);
        this.excluir = {} as Usuario;
        this.refresh();
      },
      error: (error) => {
        this.sharedService.toast('Error!', error.erro as string , 2);
      }
    })
  }
}
