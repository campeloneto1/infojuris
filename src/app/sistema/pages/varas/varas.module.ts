import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { FormularioVarasComponent } from "./formulario/formulario-varas.component";
import { VarasComponent } from "./varas.component";

@NgModule({
    declarations: [VarasComponent, FormularioVarasComponent],
    imports: [CommonModule, SharedModule ],
    exports: []
})

export class VarasModule{}