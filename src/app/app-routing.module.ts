import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./autenticacao/autenticacao.module').then((m) => m.AutenticacaoModule),
  },
  {
    path: 'sis',
    loadChildren: () => import('./sistema/sistema.module').then((m) => m.SistemaModule),
    canMatch: [AuthGuard],
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
