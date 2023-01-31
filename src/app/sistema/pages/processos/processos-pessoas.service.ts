import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { ProcessoPessoa, ProcessosPessoas } from "./processos-pessoas";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})

export class ProcessosPessoasService{
    constructor(private http: HttpClient){}

    index(): Observable<ProcessosPessoas> {
        return this.http.get<ProcessosPessoas>(`${API}/processos-pessoas`);
      }

      where(id: number): Observable<ProcessosPessoas> {
        return this.http.get<ProcessosPessoas>(`${API}/processos-pessoas/${id}/where`);
      }
    
      store(data: ProcessoPessoa){
        return this.http.post(`${API}/processos-pessoas`,data);
      }
    
      update(data: ProcessoPessoa){
        return this.http.put(`${API}/processos-pessoas/${data.id}`,data);
      }
    
      destroy(id: number){
        return this.http.delete(`${API}/processos-pessoas/${id}`);
      }
}