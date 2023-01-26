import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { FiliaisComponent } from "./filiais.component";
import { FormularioFiliaisComponent } from "./formulario/formulario-filiais.component";

@NgModule({
    declarations: [FiliaisComponent, FormularioFiliaisComponent],
    imports: [CommonModule, SharedModule],
    exports:[ ]
})

export class FiliaisModule{}