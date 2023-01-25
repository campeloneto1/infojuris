import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../sistema/pages/usuarios/usuarios';
import { Session } from './session';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
    private token!: string;
    private user!: Usuario;

    constructor(private router: Router){
        try {
            //console.log(sessionStorage.getItem('usuario'));
            var temp = localStorage.getItem('token')?.length;
            var temp2 = localStorage.getItem('user')?.length;
            if (localStorage.getItem('user')) {
              //@ts-ignore
              this.setUser(JSON.parse(atob(localStorage.getItem('user')?.substr(0, temp2 - 7))));
            }
      
            if (localStorage.getItem('token')) {
              //@ts-ignore
              this.setToken(atob(localStorage.getItem('token')?.substr(0, temp - 7)));
            }
          }
          catch (e) {
            localStorage.clear();
            this.router.navigate(['/auth'])
          }
    }

    makeid(length:any) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }

    setSession(data: Session){
        var string = this.makeid(7);
        var string2 = this.makeid(7); 

        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('token', btoa(data.token) + string);
        localStorage.setItem('user', btoa(JSON.stringify(data.user)) + string2);
    }

    check(){
        if(localStorage.getItem('token')){
            return true;
        }else{
            return false;
        }
    }

    setToken(data: string){
      this.token = data;
    }

    setUser(data: Usuario){
        this.user = data;
    }

    retornaToken(){
        return this.token;
    }

    retornaUser(){
      return this.user;
    }

    logout(){
      this.token = '';
      this.user = {} as Usuario;
      localStorage.clear();
      this.router.navigate(['/auth'])
    }

}
