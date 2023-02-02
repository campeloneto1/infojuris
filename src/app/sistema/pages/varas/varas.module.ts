import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { FormularioVarasComponent } from "./formulario/formulario-varas.component";
import { VarasComponent } from "./varas.component";

@NgModule({
    declarations: [],
    imports: [CommonModule, SharedModule,TituloModule ],
    exports: []
})

export class VarasModule{}