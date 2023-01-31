import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { AudienciaPessoa, AudienciasPessoas } from "./audiencias-pessoas";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})

export class AudienciasPessoasService{
    constructor(private http: HttpClient){}

    index(): Observable<AudienciasPessoas> {
        return this.http.get<AudienciasPessoas>(`${API}/audiencias-pessoas`);
      }

      where(id: number): Observable<AudienciasPessoas> {
        return this.http.get<AudienciasPessoas>(`${API}/audiencias-pessoas/${id}/where`);
      }

      show(id: number): Observable<AudienciaPessoa> {
        return this.http.get<AudienciaPessoa>(`${API}/audiencias-pessoas/${id}`);
      }
    
      store(data: AudienciaPessoa){
        return this.http.post(`${API}/audiencias-pessoas`,data);
      }
    
      update(data: AudienciaPessoa){
        return this.http.put(`${API}/audiencias-pessoas/${data.id}`,data);
      }
    
      destroy(id: number){
        return this.http.delete(`${API}/audiencias-pessoas/${id}`);
      }
}