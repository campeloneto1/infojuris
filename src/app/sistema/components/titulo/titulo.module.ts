import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BreadcrumbModule } from "../breadcrumb/breadcrumb.module";
import { TituloComponent } from "./titulo.component";

@NgModule({
    declarations: [TituloComponent],
    imports: [CommonModule, BreadcrumbModule],
    exports: [TituloComponent]
})

export class TituloModule{

}