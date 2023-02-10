import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { SharedModule } from "src/app/shared/shared.module";
import { Audiencias } from "../audiencias/audiencias";
import { InicioService } from "./inicio.service";

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css'],
    standalone: true,
    imports: [CommonModule, SharedModule]
})

export class InicioComponent implements OnInit{
    quantporstatus$!: Observable<any>;
    proximasaudiencias$!: Observable<Audiencias>;

    constructor(private inicioService: InicioService){

    }
    ngOnInit(): void {
       this.quantporstatus$ = this.inicioService.getQuantPorStatus();
       this.proximasaudiencias$ = this.inicioService.getProximasAudiencias();
    }
}