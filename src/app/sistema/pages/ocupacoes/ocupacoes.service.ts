import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Ocupacao, Ocupacoes } from "./ocupacoes";

const API = environment.url;

@Injectable({
  providedIn: 'root'
})
export class OcupacoesService{

    constructor(private http: HttpClient){}

    index(): Observable<Ocupacoes> {
        return this.http.get<Ocupacoes>(`${API}/ocupacoes`);
      }
    
      store(data: Ocupacao){
        return this.http.post(`${API}/ocupacoes`,data);
      }
    
      update(data: Ocupacao){
        return this.http.put(`${API}/ocupacoes/${data.id}`,data);
      }
    
      destroy(id: number){
        return this.http.delete(`${API}/ocupacoes/${id}`);
      }
}