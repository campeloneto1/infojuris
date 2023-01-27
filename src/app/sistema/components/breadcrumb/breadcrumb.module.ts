import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { BreadcrumbComponent } from "./breadcrumb.component";

@NgModule({
    declarations: [BreadcrumbComponent],
    imports: [CommonModule, SharedModule, RouterModule],
    exports: [BreadcrumbComponent]
})

export class BreadcrumbModule{}