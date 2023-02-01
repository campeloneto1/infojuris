import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { FormularioLancamentosComponent } from "./formulario/formulario-lancamentos.component";
import { LancamentosComponent } from "./lancamentos.component";

@NgModule({
    declarations: [LancamentosComponent, FormularioLancamentosComponent],
    imports: [CommonModule, SharedModule, TituloModule],
    exports: []
})

export class LancamentosModule{}