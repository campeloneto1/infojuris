import { Component, OnInit } from "@angular/core";
import { SessionService } from "src/app/shared/session.service";
import { Perfil } from "../../pages/perfis/perfis";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit{
    perfil!: Perfil;
    constructor(private sessionService: SessionService){}

    ngOnInit(): void {
        this.perfil = this.sessionService.retornaPerfil();
    }
}