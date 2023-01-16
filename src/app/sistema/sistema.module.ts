import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarModule } from './components/navbar/navbar.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { SistemaRoutingModule } from './sistema-routing.module';
import { DataTablesModule } from "angular-datatables";

import { InicioComponent } from './pages/inicio/inicio.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

import { SistemaComponent } from './sistema.component';

@NgModule({
  declarations: [SistemaComponent, InicioComponent, UsuariosComponent],
  imports: [
    CommonModule,
    RouterModule,
    SistemaRoutingModule,
    NavbarModule,
    SidebarModule,
    DataTablesModule
  ],
  exports: [],
})
export class SistemaModule {}
