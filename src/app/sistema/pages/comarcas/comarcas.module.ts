import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { ComarcasComponent } from "./comarcas.component";
import { FormularioComarcasComponent } from "./formulario/formulario-comarcas.component";

@NgModule({
    declarations: [ComarcasComponent, FormularioComarcasComponent],
    imports: [CommonModule, SharedModule],
    exports: []
})

export class ComarcasModule{

}