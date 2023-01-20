import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Perfis } from "./perfis";

const API = environment.url;

@Injectable({providedIn: 'root'})
export class PerfisService{

    constructor(private http: HttpClient){}

    index(): Observable<Perfis>{
        return this.http.get<Perfis>(`${API}/perfis`);
    }
}