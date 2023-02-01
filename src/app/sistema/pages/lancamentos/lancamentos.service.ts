import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Lancamento, Lancamentos } from "./lancamentos";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})

export class LancamentosService{
    constructor(private http: HttpClient){}

    index(): Observable<Lancamentos> {
        return this.http.get<Lancamentos>(`${API}/lancamentos`);
      }

      where(id: number): Observable<Lancamentos> {
        return this.http.get<Lancamentos>(`${API}/lancamentos/${id}/where`);
      }

      show(id: number): Observable<Lancamento> {
        return this.http.get<Lancamento>(`${API}/lancamentos/${id}`);
      }
    
      store(data: Lancamento){
        return this.http.post(`${API}/lancamentos`,data);
      }
    
      update(data: Lancamento){
        return this.http.put(`${API}/lancamentos/${data.id}`,data);
      }
    
      destroy(id: number){
        return this.http.delete(`${API}/lancamentos/${id}`);
      }
}