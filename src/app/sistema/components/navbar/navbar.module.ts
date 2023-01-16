import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NavbarCompnent } from "./navbar.component";

@NgModule({
    declarations: [NavbarCompnent],
    imports: [CommonModule, RouterModule],
    exports: [NavbarCompnent]
})

export class NavbarModule{}