import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { AudienciasComponent } from "./audiencias.component";
import { FormularioAudienciasPessoasComponent } from "./formulario-audiencias-pessoas/formulario-audiencias-pessoas.component";
import { FormularioAudienciasComponent } from "./formulario/formulario-audiencias.component";

@NgModule({
    declarations: [AudienciasComponent, FormularioAudienciasComponent, FormularioAudienciasPessoasComponent],
    imports: [CommonModule, SharedModule, TituloModule],
    exports: []
})

export class AudienciasModule{

}