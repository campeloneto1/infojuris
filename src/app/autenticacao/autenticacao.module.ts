import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AutenticacaoRoutingModule } from "./autenticacao-routing.module";
import { AutenticacaoComponent } from "./autenticacao.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
    declarations: [AutenticacaoComponent, LoginComponent],
    imports: [CommonModule, AutenticacaoRoutingModule, ReactiveFormsModule],
    exports: []
})

export class AutenticacaoModule{}