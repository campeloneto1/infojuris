import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { EscritoriosComponent } from "./escritorios.component";

@NgModule({
    declarations: [EscritoriosComponent],
    imports: [CommonModule, SharedModule],
    exports: [EscritoriosComponent]
})

export class EscritoriosModule{}