import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Filiais, Filial } from "./filiais";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})

export class FiliaisService{
    constructor(private http: HttpClient){}

    index(): Observable<Filiais> {
        return this.http.get<Filiais>(`${API}/filiais`);
      }

      where(id: number): Observable<Filiais> {
        return this.http.get<Filiais>(`${API}/filiais/${id}/where`);
      }
    
      store(data: Filial){
        return this.http.post(`${API}/filiais`,data);
      }
    
      update(data: Filial){
        return this.http.put(`${API}/filiais/${data.id}`,data);
      }
    
      destroy(id: number){
        return this.http.delete(`${API}/filiais/${id}`);
      }
}