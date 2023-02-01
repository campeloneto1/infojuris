import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { FormularioPerfisComponent } from "./formulario/formulario-perfis.component";
import { PerfisComponent } from "./perfis.component";

@NgModule({
    declarations: [PerfisComponent, FormularioPerfisComponent],
    imports: [CommonModule, SharedModule, TituloModule],
    exports: []
})

export class PerfisModule{

}