import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Audiencias } from "../audiencias/audiencias";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})

export class InicioService{

    constructor(private http: HttpClient){}

    getQuantPorStatus(): Observable<any>{
        return this.http.get<any>(`${API}/inicio-quantporstatus`)
    }

    getProximasAudiencias(): Observable<Audiencias>{
        return this.http.get<Audiencias>(`${API}/inicio-proximasaudiencias`)
    }
}