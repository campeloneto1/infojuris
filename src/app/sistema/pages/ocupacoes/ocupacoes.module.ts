import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { FormularioOcupacoesComponent } from "./formulario/formulario-ocupacoes.component";
import { OcupacoesComponent } from "./ocupacoes.component";

@NgModule({
    declarations: [OcupacoesComponent, FormularioOcupacoesComponent],
    imports: [CommonModule, SharedModule],
    exports: [],
})

export class OcupacoesModule{}