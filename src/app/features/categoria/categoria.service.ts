import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly API_URL = 'http://localhost:3000/categoria';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API_URL).pipe(
      tap(categorias => console.log('Categorias:', categorias))
    );
  }

  getById(id: string): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.API_URL}/${id}`).pipe(
      tap(categoria => console.log('Categoria:', categoria))
    );
  }

  create(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.API_URL, categoria).pipe(
      tap(categoria => console.log('Categoria:', categoria))
    );
  }

  update(id: string, categoria: Categoria): Observable<Categoria> {
    return this.http.patch<Categoria>(`${this.API_URL}/${id}`, categoria).pipe(
      tap(categoria => console.log('Categoria:', categoria))
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(categoria => console.log('Categoria:', categoria))
    );
  }
}
