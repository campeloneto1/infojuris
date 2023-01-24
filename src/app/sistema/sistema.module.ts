import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NavbarModule } from './components/navbar/navbar.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { SistemaRoutingModule } from './sistema-routing.module';
import { SistemaComponent } from './sistema.component';

import { InicioComponent } from './pages/inicio/inicio.component';

import { EscritoriosModule } from './pages/escritorios/escritorios.module';
import { NaturezasModule } from './pages/naturezas/naturezas.module';
import { OcupacoesModule } from './pages/ocupacoes/ocupacoes.module';
import { UsuariosModule } from './pages/usuarios/usuarios.module';
import { TribunaisModule } from './pages/tribunais/tribunais.module';


@NgModule({
  declarations: [SistemaComponent, InicioComponent],
  imports: [
    CommonModule,
    RouterModule,
    SistemaRoutingModule,
    NavbarModule,
    SidebarModule,
    HttpClientModule,
    EscritoriosModule,
    NaturezasModule,
    OcupacoesModule,
    UsuariosModule,
    TribunaisModule
  ],
  exports: []
})
export class SistemaModule {}
