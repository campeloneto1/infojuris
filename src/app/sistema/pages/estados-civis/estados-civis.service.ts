import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { EstadoCivil, EstadosCivis } from "./estados-civis";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})

export class EstadosCivisService{
    constructor(private http: HttpClient){}

    index(): Observable<EstadosCivis> {
        return this.http.get<EstadosCivis>(`${API}/estados-civis`);
      }
    
      store(data: EstadoCivil){
        return this.http.post(`${API}/estados-civis`,data);
      }
    
      update(data: EstadoCivil){
        return this.http.put(`${API}/estados-civis/${data.id}`,data);
      }
    
      destroy(id: number){
        return this.http.delete(`${API}/estados-civis/${id}`);
      }
}