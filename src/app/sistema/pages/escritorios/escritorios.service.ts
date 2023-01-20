import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Escritorios } from './escritorios';

const API = environment.url;

@Injectable({ providedIn: 'root' })
export class EscritoriosService {
  constructor(private http: HttpClient) {}

  index(): Observable<Escritorios> {
    return this.http.get<Escritorios>(`${API}/escritorios`);
  }
}
