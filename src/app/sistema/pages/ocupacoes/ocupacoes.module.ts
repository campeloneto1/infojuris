import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { FormularioOcupacoesComponent } from "./formulario/formulario-ocupacoes.component";
import { OcupacoesComponent } from "./ocupacoes.component";

@NgModule({
    declarations: [],
    imports: [CommonModule, SharedModule, TituloModule],
    exports: [],
})

export class OcupacoesModule{}