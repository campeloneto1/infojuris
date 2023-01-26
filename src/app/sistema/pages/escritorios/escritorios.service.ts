import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Escritorio, Escritorios } from './escritorios';

const API = environment.url;

@Injectable({ providedIn: 'root' })
export class EscritoriosService {
  constructor(private http: HttpClient) {}

  index(): Observable<Escritorios> {
    return this.http.get<Escritorios>(`${API}/escritorios`);
  }

  store(data: Escritorio){
    return this.http.post(`${API}/escritorios`,data);
  }

  update(data: Escritorio){
    return this.http.put(`${API}/escritorios/${data.id}`,data);
  }

  destroy(id: number){
    return this.http.delete(`${API}/escritorios/${id}`);
  }
}
