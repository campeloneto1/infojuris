import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Status, Statuss } from "./status";

const API = environment.url;

@Injectable({
    providedIn: 'root'
})

export class StatusService{
    constructor(private http: HttpClient){}

    index(): Observable<Statuss> {
        return this.http.get<Statuss>(`${API}/status`);
      }
    
      store(data: Status){
        return this.http.post(`${API}/status`,data);
      }
    
      update(data: Status){
        return this.http.put(`${API}/status/${data.id}`,data);
      }
    
      destroy(id: number){
        return this.http.delete(`${API}/status/${id}`);
      }
}