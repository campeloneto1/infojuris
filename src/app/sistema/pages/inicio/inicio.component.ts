import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class InicioComponent{}