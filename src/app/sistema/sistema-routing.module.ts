import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SistemaComponent } from './sistema.component';
import { AlowedGuard } from '../guards/alowed.guard';

const routes: Routes = [
  {
    path: '',
    component: SistemaComponent,
    children: [
      {
        path: 'Inicio',
        //component: InicioComponent,
        canActivate: [AlowedGuard],
        loadComponent: () => import('./pages/inicio/inicio.component').then(c => c.InicioComponent),
      },
      {
        path: 'Agenda',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        loadComponent: () => import('./pages/agenda/agenda.component').then(c => c.AgendaComponent),
        canActivate: [AlowedGuard]
        //component: AgendaComponent,
        
      },
      {
        path: 'Audiencias',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        //component: AudienciasComponent,
        loadComponent: () => import('./pages/audiencias/audiencias.component').then(c => c.AudienciasComponent),
        canActivate: [AlowedGuard]
      },
     
      {
        path: 'Cidades',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        //component: CidadesComponent,
        loadComponent: () => import('./pages/cidades/cidades.component').then(c => c.CidadesComponent),
        canActivate: [AlowedGuard]
      },
     
      {
        path: 'Comarcas',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        //component: ComarcasComponent,
        loadComponent: () => import('./pages/comarcas/comarcas.component').then(c => c.ComarcasComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Escritorios',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        //component: EscritoriosComponent,
        loadComponent: () => import('./pages/escritorios/escritorios.component').then(c => c.EscritoriosComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Estados',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        //component: EstadosComponent,
        loadComponent: () => import('./pages/estados/estados.component').then(c => c.EstadosComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Estados-Civis',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        //component: EstadosCivisComponent,
        loadComponent: () => import('./pages/estados-civis/estados-civis.component').then(c => c.EstadosCivisComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Filiais',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        //component: FiliaisComponent,
        loadComponent: () => import('./pages/filiais/filiais.component').then(c => c.FiliaisComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Lancamentos',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        //component: LancamentosComponent,
        loadComponent: () => import('./pages/lancamentos/lancamentos.component').then(c => c.LancamentosComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Naturezas',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        //component: NaturezasComponent,
        loadComponent: () => import('./pages/naturezas/naturezas.component').then(c => c.NaturezasComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Ocupacoes',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        //component: OcupacoesComponent,
        loadComponent: () => import('./pages/ocupacoes/ocupacoes.component').then(c => c.OcupacoesComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Paises',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        //component: PaisesComponent,
        loadComponent: () => import('./pages/paises/paises.component').then(c => c.PaisesComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Perfis',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        //component: PerfisComponent,
        loadComponent: () => import('./pages/perfis/perfis.component').then(c => c.PerfisComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Pessoas',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        //component: PessoasComponent,
        loadComponent: () => import('./pages/pessoas/pessoas.component').then(c => c.PessoasComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Processo/:id',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        //component: ProcessoComponent,
        loadComponent: () => import('./pages/processos/processo/processo.component').then(c => c.ProcessoComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Processos',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        //component: ProcessosComponent,
        loadComponent: () => import('./pages/processos/processos.component').then(c => c.ProcessosComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Status',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        //component: StatusComponent,
        loadComponent: () => import('./pages/status/status.component').then(c => c.StatusComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Sexos',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        //component: SexosComponent,
        loadComponent: () => import('./pages/sexos/sexos.component').then(c => c.SexosComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Tribunais',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        //component: TribunaisComponent,
        loadComponent: () => import('./pages/tribunais/tribunais.component').then(c => c.TribunaisComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Usuarios',
        //loadChildren: () => import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule),
        //component: UsuariosComponent,
        loadComponent: () => import('./pages/usuarios/usuarios.component').then(c => c.UsuariosComponent),
        canActivate: [AlowedGuard]
      },
      {
        path: 'Varas',
        //loadChildren: () => import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule),
        //component: VarasComponent,
        loadComponent: () => import('./pages/varas/varas.component').then(c => c.VarasComponent),
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
