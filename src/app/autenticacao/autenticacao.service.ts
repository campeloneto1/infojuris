import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Login } from "./login/login";
import { Observable } from "rxjs";
import { Session } from "../shared/session";
import { environment } from "src/environments/environments";

const API = environment.url;

@Injectable({
    providedIn: 'root',
  })
export class AutenticacaoService{
    constructor(private http: HttpClient){}

    doLogin(data: Login){
        return this.http.post(`${API}/login`, data) as Observable<Session>;
    }
}