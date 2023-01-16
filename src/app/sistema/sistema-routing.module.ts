import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
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
        path: 'Usuarios',
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
