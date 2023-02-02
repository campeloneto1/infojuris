import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { EstadosComponent } from "./estados.component";
import { FormularioEstadosComponent } from "./formulario/formulario-estados.component";

@NgModule({
    declarations: [],
    imports: [CommonModule, SharedModule, TituloModule],
    exports: []
})

export class EstadosModule{}