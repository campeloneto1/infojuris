import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Pessoa, Pessoas } from "./pessoas";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})

export class PessoasService{
    constructor(private http: HttpClient){}

    index(): Observable<Pessoas> {
        return this.http.get<Pessoas>(`${API}/pessoas`);
      }

      where(id: number): Observable<Pessoas> {
        return this.http.get<Pessoas>(`${API}/pessoas/${id}/where`);
      }
    
      store(data: Pessoa){
        return this.http.post(`${API}/pessoas`,data);
      }
    
      update(data: Pessoa){
        return this.http.put(`${API}/pessoas/${data.id}`,data);
      }
    
      destroy(id: number){
        return this.http.delete(`${API}/pessoas/${id}`);
      }
}