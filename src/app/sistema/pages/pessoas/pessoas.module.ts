import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { PessoasComponent } from "./pessoas.component";
import { FormularioPessoasComponent } from "./formulario/formulario-pessoas.component";

@NgModule({
    declarations: [],
    imports: [CommonModule, SharedModule, TituloModule],
    exports: []
})

export class PessoasModule{}