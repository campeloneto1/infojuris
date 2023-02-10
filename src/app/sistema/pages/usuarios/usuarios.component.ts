import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Usuario, Usuarios } from './usuarios';
import { Observable, Subject, tap } from 'rxjs';
import { UsuariosService } from './usuarios.service';
import { FomularioUsuariosComponent } from './formulario/formulario-usuarios.component';
import { SharedService } from 'src/app/shared/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TituloModule } from '../../components/titulo/titulo.module';
import { SessionService } from 'src/app/shared/session.service';
import { Perfil } from '../perfis/perfis';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  standalone: true,
  imports: [CommonModule, SharedModule, TituloModule, FomularioUsuariosComponent], 
  
})
export class UsuariosComponent implements OnInit, OnDestroy {
  data$!: Observable<Usuarios>;
  excluir!: Usuario;
  pass!: Usuario;

  @ViewChild(FomularioUsuariosComponent) child! : FomularioUsuariosComponent;
  @ViewChild(DataTableDirective, {static: false})  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<Usuarios>();

  perfil!: Perfil;

  constructor( private sharedService: SharedService,
    private sessionService: SessionService,
    private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    
    this.dtOptions = this.sharedService.getDtOptions();
      this.dtOptions = {...this.dtOptions, order: [2, 'asc']}

    this.perfil = this.sessionService.retornaPerfil();

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

  resetpass(data: Usuario){
    this.pass = data;
  }

  confirmPass(){
      this.usuariosService.resetpass(this.pass.id || 0).subscribe({
        next: (data) => {
          this.sharedService.toast('Sucesso!', data as string , 3);
          this.pass = {} as Usuario;
          this.refresh();
        },
        error: (error) => {
          this.sharedService.toast('Error!', error.erro as string , 2);
        }
      })
  }
}
