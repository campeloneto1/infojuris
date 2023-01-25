import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  
  {
    path: 'auth',
    loadChildren: () => import('./autenticacao/autenticacao.module').then((m) => m.AutenticacaoModule),
  },
  {
    path: '',
    loadChildren: () => import('./sistema/sistema.module').then((m) => m.SistemaModule),
    canMatch: [AuthGuard],
  },
  {path: '**', redirectTo: 'auth', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
