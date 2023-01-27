import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Audiencia, Audiencias } from "./audiencias";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})

export class AudienciasService{
    constructor(private http: HttpClient){}

    index(): Observable<Audiencias> {
        return this.http.get<Audiencias>(`${API}/audiencias`);
      }

      where(id: number): Observable<Audiencias> {
        return this.http.get<Audiencias>(`${API}/audiencias/${id}/where`);
      }
    
      store(data: Audiencia){
        return this.http.post(`${API}/audiencias`,data);
      }
    
      update(data: Audiencia){
        return this.http.put(`${API}/audiencias/${data.id}`,data);
      }
    
      destroy(id: number){
        return this.http.delete(`${API}/audiencias/${id}`);
      }
}