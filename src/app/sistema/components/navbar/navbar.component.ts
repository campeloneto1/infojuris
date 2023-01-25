import { Component, OnInit } from "@angular/core";
import { SessionService } from "src/app/shared/session.service";
import { Usuario } from "../../pages/usuarios/usuarios";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarCompnent implements OnInit{
    user!: Usuario;

    constructor(private sessionService: SessionService){
        
    }
    
    ngOnInit(): void {
       this.user = this.sessionService.retornaUser();
    }

    logout(){
        this.sessionService.logout();
    }
}