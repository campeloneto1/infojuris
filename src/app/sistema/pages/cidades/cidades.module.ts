import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { CidadesComponent } from "./cidades.component";
import { FormularioCidadesComponent } from "./formulario/formulario-cidades.component";

@NgModule({
    declarations: [CidadesComponent, FormularioCidadesComponent],
    imports: [CommonModule, SharedModule, TituloModule],
    exports: []
})

export class CidadesModule{}