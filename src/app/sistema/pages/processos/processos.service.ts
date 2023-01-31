import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Processo, Processos } from "./processos";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})

export class ProcessosService{
    constructor(private http: HttpClient){}

    index(): Observable<Processos> {
        return this.http.get<Processos>(`${API}/processos`);
      }

      where(id: number): Observable<Processos> {
        return this.http.get<Processos>(`${API}/processos/${id}/where`);
      }

      show(id: number): Observable<Processo> {
        return this.http.get<Processo>(`${API}/processos/${id}`);
      }

      changeStatus(data: Processo){
        return this.http.post(`${API}/processos-status`,data);
      }
    
      store(data: Processo){
        return this.http.post(`${API}/processos`,data);
      }
    
      update(data: Processo){
        return this.http.put(`${API}/processos/${data.id}`,data);
      }
    
      destroy(id: number){
        return this.http.delete(`${API}/processos/${id}`);
      }
}