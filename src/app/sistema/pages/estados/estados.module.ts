import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { EstadosComponent } from "./estados.component";
import { FormularioEstadosComponent } from "./formulario/formulario-estados.component";

@NgModule({
    declarations: [EstadosComponent, FormularioEstadosComponent],
    imports: [CommonModule, SharedModule],
    exports: []
})

export class EstadosModule{}