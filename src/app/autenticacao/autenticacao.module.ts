import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { AutenticacaoComponent } from './autenticacao.component';
import { CadastreseComponent } from './cadastrese/cadastrese.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AutenticacaoComponent, LoginComponent, CadastreseComponent],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [],
})
export class AutenticacaoModule {}
