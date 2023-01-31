import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { TituloModule } from "../../components/titulo/titulo.module";
import { AgendaComponent } from "./agenda.component";

@NgModule({
    declarations: [AgendaComponent],
    imports: [CommonModule, SharedModule, TituloModule],
    exports: []
})

export class AgendaModule{

}