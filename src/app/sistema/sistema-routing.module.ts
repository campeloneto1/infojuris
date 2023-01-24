import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscritoriosComponent } from './pages/escritorios/escritorios.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NaturezasComponent } from './pages/naturezas/naturezas.component';
import { OcupacoesComponent } from './pages/ocupacoes/ocupacoes.component';
import { TribunaisComponent } from './pages/tribunais/tribunais.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
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
        path: 'Escritorios',
        //loadChildren: () => import('./pages/escritorios/escritorios.module').then((m) => m.EscritoriosModule),
        component: EscritoriosComponent,
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
        path: 'Tribunais',
        //loadChildren: () => import('./pages/naturezas/naturezas.module').then((m) => m.NaturezasModule),
        component: TribunaisComponent,
      },
      {
        path: 'Usuarios',
        //loadChildren: () => import('./pages/usuarios/usuarios.module').then((m) => m.UsuariosModule),
        component: UsuariosComponent,
      },
      
      { path: '', redirectTo: 'Inicio', pathMatch: 'full' },
      { path: '**', redirectTo: '/', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SistemaRoutingModule {}
