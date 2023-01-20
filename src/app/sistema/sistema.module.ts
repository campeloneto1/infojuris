import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavbarModule } from './components/navbar/navbar.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { SistemaRoutingModule } from './sistema-routing.module';


import { InicioComponent } from './pages/inicio/inicio.component';

import { SistemaComponent } from './sistema.component';
import { UsuariosModule } from './pages/usuarios/usuarios.module';
import { EscritoriosModule } from './pages/escritorios/escritorios.module';

@NgModule({
  declarations: [SistemaComponent, InicioComponent],
  imports: [
    CommonModule,
    RouterModule,
    SistemaRoutingModule,
    NavbarModule,
    SidebarModule,
    HttpClientModule,
    UsuariosModule,
    EscritoriosModule
  ],
  exports: []
})
export class SistemaModule {}
