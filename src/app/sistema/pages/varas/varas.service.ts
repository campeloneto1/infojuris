import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Vara, Varas } from "./varas";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})

export class VarasService{
    constructor(private http: HttpClient){}

    index(): Observable<Varas> {
        return this.http.get<Varas>(`${API}/varas`);
      }

      where(id: number): Observable<Varas> {
        return this.http.get<Varas>(`${API}/varas/${id}/where`);
      }
    
      store(data: Vara){
        return this.http.post(`${API}/varas`,data);
      }
    
      update(data: Vara){
        return this.http.put(`${API}/varas/${data.id}`,data);
      }
    
      destroy(id: number){
        return this.http.delete(`${API}/varas/${id}`);
      }
}