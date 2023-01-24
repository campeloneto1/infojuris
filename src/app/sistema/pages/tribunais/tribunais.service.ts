import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environments";
import { Tribunais, Tribunal } from "./tribunais";

const API = environment.url;

@Injectable({
    providedIn: 'root',
  })

  export class TribunaisService{
    constructor(private http: HttpClient){}

    index(): Observable<Tribunais> {
        return this.http.get<Tribunais>(`${API}/tribunais`);
      }
    
      store(data: Tribunal){
        return this.http.post(`${API}/tribunais`,data);
      }
    
      update(data: Tribunal){
        return this.http.put(`${API}/tribunais/${data.id}`,data);
      }
    
      destroy(id: number){
        return this.http.delete(`${API}/tribunais/${id}`);
      }
  }