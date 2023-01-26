import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { CidadesComponent } from "./cidades.component";
import { FormularioCidadesComponent } from "./formulario/formulario-cidades.component";

@NgModule({
    declarations: [CidadesComponent, FormularioCidadesComponent],
    imports: [CommonModule, SharedModule],
    exports: []
})

export class CidadesModule{}