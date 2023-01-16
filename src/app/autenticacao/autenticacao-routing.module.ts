import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoComponent } from './autenticacao.component';
import { CadastreseComponent } from './cadastrese/cadastrese.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AutenticacaoComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'cadastrese', component: CadastreseComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutenticacaoRoutingModule {}
