import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Cliente, Clientes } from "./clientes";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})

export class ClientesService{
    constructor(private http: HttpClient){}

    index(): Observable<Clientes> {
        return this.http.get<Clientes>(`${API}/clientes`);
      }

      where(id: number): Observable<Clientes> {
        return this.http.get<Clientes>(`${API}/clientes/${id}/where`);
      }
    
      store(data: Cliente){
        return this.http.post(`${API}/clientes`,data);
      }
    
      update(data: Cliente){
        return this.http.put(`${API}/clientes/${data.id}`,data);
      }
    
      destroy(id: number){
        return this.http.delete(`${API}/clientes/${id}`);
      }
}