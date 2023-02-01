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
import { PaisesModule } from './pages/paises/paises.module';
import { EstadosModule } from './pages/estados/estados.module';
import { CidadesModule } from './pages/cidades/cidades.module';
import { ComarcasModule } from './pages/comarcas/comarcas.module';
import { VarasModule } from './pages/varas/varas.module';
import { FiliaisModule } from './pages/filiais/filiais.module';
import { PessoasModule } from './pages/pessoas/pessoas.module';
import { ProcessosModule } from './pages/processos/processos.module';
import { EstadosCivisModule } from './pages/estados-civis/estados-civis.module';
import { SexosModule } from './pages/sexos/sexos.module';
import { StatusModule } from './pages/status/status.module';
import { AudienciasModule } from './pages/audiencias/audiencias.module';
import { AgendaModule } from './pages/agenda/agenda.module';
import { LancamentosModule } from './pages/lancamentos/lancamentos.module';
import { PerfisModule } from './pages/perfis/perfis.module';


@NgModule({
  declarations: [SistemaComponent, InicioComponent],
  imports: [
    CommonModule,
    RouterModule,
    SistemaRoutingModule,
    NavbarModule,
    SidebarModule,
    HttpClientModule,
    AgendaModule,
    AudienciasModule,
    CidadesModule,
    ComarcasModule,
    EscritoriosModule,
    EstadosModule,
    EstadosCivisModule,
    FiliaisModule,
    LancamentosModule,
    NaturezasModule,
    PaisesModule,
    PessoasModule,
    PerfisModule,
    ProcessosModule,
    SexosModule,
    StatusModule,
    OcupacoesModule,
    UsuariosModule,
    TribunaisModule,
    VarasModule
  ],
  exports: []
})
export class SistemaModule {}
