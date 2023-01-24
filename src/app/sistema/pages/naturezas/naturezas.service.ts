import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Natureza, Naturezas } from "./naturezas";


const API = environment.url;

@Injectable({
    providedIn: 'root',
  })

  export class NaturezasService{
    constructor(private http: HttpClient){}

    index(): Observable<Naturezas> {
        return this.http.get<Naturezas>(`${API}/naturezas`);
      }
    
      store(data: Natureza){
        return this.http.post(`${API}/naturezas`,data);
      }
    
      update(data: Natureza){
        return this.http.put(`${API}/naturezas/${data.id}`,data);
      }
    
      destroy(id: number){
        return this.http.delete(`${API}/naturezas/${id}`);
      }
  }