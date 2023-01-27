import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { FormularioPaisesComponent } from "./formulario/formulario-paises.component";
import { PaisesComponent } from "./paises.component";

@NgModule({
    declarations: [PaisesComponent, FormularioPaisesComponent],
    imports: [CommonModule, SharedModule, TituloModule],
    exports: []
})

export class PaisesModule{

}