import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { NavbarCompnent } from "./navbar.component";

@NgModule({
    declarations: [NavbarCompnent],
    imports: [CommonModule, RouterModule, SharedModule, FormsModule],
    exports: [NavbarCompnent]
})

export class NavbarModule{}