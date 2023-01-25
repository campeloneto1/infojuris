import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { FormularioPaisesComponent } from "./formulario/formulario-paises.component";
import { PaisesComponent } from "./paises.component";

@NgModule({
    declarations: [PaisesComponent, FormularioPaisesComponent],
    imports: [CommonModule, SharedModule],
    exports: []
})

export class PaisesModule{

}