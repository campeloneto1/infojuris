import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Comarca, Comarcas } from "./comarcas";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})

export class ComarcasService{
    constructor(private http: HttpClient){}

    index(): Observable<Comarcas> {
        return this.http.get<Comarcas>(`${API}/comarcas`);
      }

      where(id: number): Observable<Comarcas> {
        return this.http.get<Comarcas>(`${API}/comarcas/${id}/where`);
      }
    
      store(data: Comarca){
        return this.http.post(`${API}/comarcas`,data);
      }
    
      update(data: Comarca){
        return this.http.put(`${API}/comarcas/${data.id}`,data);
      }
    
      destroy(id: number){
        return this.http.delete(`${API}/comarcas/${id}`);
      }
}