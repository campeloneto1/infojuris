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
import { LancamentosComponent } from './pages/lancamentos/lancamentos.component';
import { PerfisComponent } from './pages/perfis/perfis.component';
import { AlowedGuard } from '../guards/alowed.guard';

const routes: Routes = [
  {
    path: '',
    component: SistemaComponent,
    children: [
      {
        path: 'Inicio',
        component: InicioComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Agenda',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        component: AgendaComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Audiencias',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        component: AudienciasComponent,
        canActivate: [AlowedGuard]
      },
     
      {
        path: 'Cidades',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        component: CidadesComponent,
        canActivate: [AlowedGuard]
      },
     
      {
        path: 'Comarcas',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        component: ComarcasComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Escritorios',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        component: EscritoriosComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Estados',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: EstadosComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Estados-Civis',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: EstadosCivisComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Filiais',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: FiliaisComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Lancamentos',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: LancamentosComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Naturezas',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: NaturezasComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Ocupacoes',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: OcupacoesComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Paises',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: PaisesComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Perfis',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: PerfisComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Pessoas',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        component: PessoasComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Processo/:id',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: ProcessoComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Processos',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: ProcessosComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Status',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: StatusComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Sexos',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: SexosComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Tribunais',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: TribunaisComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Usuarios',
        //loadChildren: () => import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule),
        component: UsuariosComponent,
        canActivate: [AlowedGuard]
      },
      {
        path: 'Varas',
        //loadChildren: () => import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule),
        component: VarasComponent,
        canActivate: [AlowedGuard]
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
