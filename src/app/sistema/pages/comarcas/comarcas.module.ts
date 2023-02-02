import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { ComarcasComponent } from "./comarcas.component";
import { FormularioComarcasComponent } from "./formulario/formulario-comarcas.component";

@NgModule({
    declarations: [],
    imports: [CommonModule, SharedModule, TituloModule],
    exports: []
})

export class ComarcasModule{

}