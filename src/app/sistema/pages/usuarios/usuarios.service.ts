import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { Usuarios } from './usuarios';

const API = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  index(): Observable<Usuarios> {
    return this.http.get<Usuarios>(`${API}/users`);
  }
}
