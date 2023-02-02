import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { EstadosCivisComponent } from "./estados-civis.component";
import { FormularioEstadosCivisComponent } from "./formulario/formulario-estados-civis.component";

@NgModule({
    declarations: [],
    imports: [CommonModule, SharedModule, TituloModule],
    exports: []
})

export class EstadosCivisModule{

}