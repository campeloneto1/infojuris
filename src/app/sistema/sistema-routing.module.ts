import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CidadesComponent } from './pages/cidades/cidades.component';
import { PessoasComponent } from './pages/pessoas/pessoas.component';
import { ComarcasComponent } from './pages/comarcas/comarcas.component';
import { EscritoriosComponent } from './pages/escritorios/escritorios.component';
import { EstadosComponent } from './pages/estados/estados.component';
import { FiliaisComponent } from './pages/filiais/filiais.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NaturezasComponent } from './pages/naturezas/naturezas.component';
import { OcupacoesComponent } from './pages/ocupacoes/ocupacoes.component';
import { PaisesComponent } from './pages/paises/paises.component';
import { ProcessosComponent } from './pages/processos/processos.component';
import { TribunaisComponent } from './pages/tribunais/tribunais.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { VarasComponent } from './pages/varas/varas.component';
import { SistemaComponent } from './sistema.component';
import { StatusComponent } from './pages/status/status.component';
import { SexosComponent } from './pages/sexos/sexos.component';
import { EstadosCivisComponent } from './pages/estados-civis/estados-civis.component';
import { AudienciasComponent } from './pages/audiencias/audiencias.component';
import { ProcessoComponent } from './pages/processos/processo/processo.component';
import { AgendaComponent } from './pages/agenda/agenda.component';

const routes: Routes = [
  {
    path: '',
    component: SistemaComponent,
    children: [
      {
        path: 'Inicio',
        component: InicioComponent,
      },
      {
        path: 'Agenda',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        component: AgendaComponent,
      },
      {
        path: 'Audiencias',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        component: AudienciasComponent,
      },
     
      {
        path: 'Cidades',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        component: CidadesComponent,
      },
     
      {
        path: 'Comarcas',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        component: ComarcasComponent,
      },
      {
        path: 'Escritorios',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        component: EscritoriosComponent,
      },
      {
        path: 'Estados',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: EstadosComponent,
      },
      {
        path: 'Estados-Civis',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: EstadosCivisComponent,
      },
      {
        path: 'Filiais',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: FiliaisComponent,
      },
      {
        path: 'Naturezas',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: NaturezasComponent,
      },
      {
        path: 'Ocupacoes',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: OcupacoesComponent,
      },
      {
        path: 'Paises',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: PaisesComponent,
      },
      {
        path: 'Pessoas',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        component: PessoasComponent,
      },
      {
        path: 'Processo/:id',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: ProcessoComponent,
      },
      {
        path: 'Processos',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: ProcessosComponent,
      },
      {
        path: 'Status',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: StatusComponent,
      },
      {
        path: 'Sexos',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: SexosComponent,
      },
      {
        path: 'Tribunais',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: TribunaisComponent,
      },
      {
        path: 'Usuarios',
        //loadChildren: () => import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule),
        component: UsuariosComponent,
      },
      {
        path: 'Varas',
        //loadChildren: () => import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule),
        component: VarasComponent,
      },
      { path: '', redirectTo: 'Inicio', pathMatch: 'full' },
      { path: '**', redirectTo: 'Inicio', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SistemaRoutingModule {}
