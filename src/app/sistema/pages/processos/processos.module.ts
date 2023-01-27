import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { FormularioProcessosComponent } from "./formulario/formulario-processos.component";
import { ProcessosComponent } from "./processos.component";

@NgModule({
    declarations: [ProcessosComponent, FormularioProcessosComponent],
    imports: [CommonModule, SharedModule, TituloModule],
    exports: []
})

export class ProcessosModule{

}