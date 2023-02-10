import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SessionService } from "src/app/shared/session.service";
import { SharedService } from "src/app/shared/shared.service";
import { Usuario } from "../../pages/usuarios/usuarios";
import { UsuariosService } from "../../pages/usuarios/usuarios.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavbarCompnent implements OnInit{
    user!: Usuario;

    protected form!: FormGroup;


    constructor(private sessionService: SessionService,
        private usuariosService: UsuariosService,
        private sharedService: SharedService,
        private formBuilder: FormBuilder){
        
    }
    
    ngOnInit(): void {
       this.user = this.sessionService.retornaUser();

       this.form = this.formBuilder.group({
        id: [''],
        senha: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ]),
        ],
        confirmsenha: [
            '',
            Validators.compose([
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(20),
            ]),
          ],
      });
    }

    logout(){
        this.sessionService.logout();
    }

    alterarSenha(){
        this.usuariosService.changpass(this.form.value).subscribe({
            next: (data) => {
                this.sharedService.toast('Sucesso!', data as string, 3);
                this.form.reset();
            },
            error: (error)=> {
                this.sharedService.toast('Error!', error.erro as string, 2);
            }
        })
    }
}