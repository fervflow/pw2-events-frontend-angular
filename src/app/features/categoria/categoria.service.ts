import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly API_URL = 'http://localhost:3000/categoria';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API_URL);
  }

  getById(id: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.API_URL}/${id}`);
  }

  create(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.API_URL, categoria);
  }

  update(id: string, categoria: Categoria): Observable<Categoria> {
    return this.http.patch<Categoria>(`${this.API_URL}/${id}`, categoria);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
