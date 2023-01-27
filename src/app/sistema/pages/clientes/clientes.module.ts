import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { ClientesComponent } from "./clientes.component";
import { FormularioClientesComponent } from "./formulario/formulario-clientes.component";

@NgModule({
    declarations: [ClientesComponent, FormularioClientesComponent],
    imports: [CommonModule, SharedModule, TituloModule],
    exports: []
})

export class ClientesModule{}