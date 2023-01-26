import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { EscritoriosComponent } from "./escritorios.component";
import { FormularioEscritoriosComponent } from "./formulario/formulario-escritorios.component";

@NgModule({
    declarations: [EscritoriosComponent, FormularioEscritoriosComponent],
    imports: [CommonModule, SharedModule],
    exports: []
})

export class EscritoriosModule{}