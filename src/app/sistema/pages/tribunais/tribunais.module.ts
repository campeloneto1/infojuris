import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { FormularioTribunaisComponent } from "./formulario/formulario-tribunais.component";
import { TribunaisComponent } from "./tribunais.component";

@NgModule({
    declarations: [TribunaisComponent, FormularioTribunaisComponent],
    imports: [CommonModule, SharedModule],
    exports: []
})

export class TribunaisModule{}