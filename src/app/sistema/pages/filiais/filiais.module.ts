import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { FiliaisComponent } from "./filiais.component";
import { FormularioFiliaisComponent } from "./formulario/formulario-filiais.component";

@NgModule({
    declarations: [],
    imports: [CommonModule, SharedModule, TituloModule],
    exports:[ ]
})

export class FiliaisModule{}