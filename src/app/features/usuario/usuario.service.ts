import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly API_URL = 'http://localhost:3000/usuario';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API_URL).pipe(
      tap(usuarios => console.log('Usuarios:', usuarios))
    );
  }

  getById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_URL}/${id}`).pipe(
      tap(usuarios => console.log('Usuario:', usuarios))
    );
  }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.API_URL, usuario).pipe(
      tap(usuarios => console.log('Usuario:', usuarios))
    );
  }

  update(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_URL}/${id}`, usuario).pipe(
      tap(usuarios => console.log('Usuario:', usuarios))
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(usuarios => console.log('Usuario:', usuarios))
    );
  }
}
