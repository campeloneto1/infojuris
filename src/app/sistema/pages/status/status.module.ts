import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { FormularioStatusComponent } from "./formulario/formulario-status.component";
import { StatusComponent } from "./status.component";

@NgModule({
    declarations: [StatusComponent, FormularioStatusComponent],
    imports: [CommonModule, SharedModule, TituloModule],
    exports: []
})

export class StatusModule{

}