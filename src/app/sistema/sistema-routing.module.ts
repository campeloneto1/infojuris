import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CidadesComponent } from './pages/cidades/cidades.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
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
        path: 'Cidades',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        component: CidadesComponent,
      },
      {
        path: 'Clientes',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        component: ClientesComponent,
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
        path: 'Processos',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: ProcessosComponent,
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
