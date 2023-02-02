import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { EscritoriosComponent } from "./escritorios.component";
import { FormularioEscritoriosComponent } from "./formulario/formulario-escritorios.component";

@NgModule({
    declarations: [],
    imports: [CommonModule, SharedModule, TituloModule],
    exports: []
})

export class EscritoriosModule{}