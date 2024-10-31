import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Publicacion, PublicacionRequest } from './publicacion.model';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private readonly API_URL = 'http://localhost:3000/publicacion';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.API_URL).pipe(
      tap(publicaciones => console.log('Publicaciones:', publicaciones))
    );
  }

  getById(id: string): Observable<Publicacion> {
    return this.http.get<Publicacion>(`${this.API_URL}/${id}`).pipe(
      tap(publicacion => console.log('Publicacion:', publicacion))
    );
  }

  create(publicacion: PublicacionRequest): Observable<Publicacion> {
    return this.http.post<Publicacion>(this.API_URL, publicacion).pipe(
      tap(publicacion => console.log('Publicacion:', publicacion))
    );
  }

  update(id: string, publicacion: PublicacionRequest): Observable<Publicacion> {
    return this.http.patch<Publicacion>(`${this.API_URL}/${id}`, publicacion).pipe(
      tap(publicacion => console.log('Publicacion:', publicacion))
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(publicacion => console.log('Publicacion:', publicacion))
    );
  }
}