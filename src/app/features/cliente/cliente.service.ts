import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Cliente } from './cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly API_URL = 'http://localhost:3000/cliente';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API_URL).pipe(
      tap(clientes => console.log('clientes:', clientes))
    );
  }
  getById(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API_URL}/${id}`).pipe(
      tap(cliente => console.log('cliente:', cliente))
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API_URL, cliente).pipe(
      tap(cliente => console.log('cliente:', cliente))
    );
  }

  update(id: string, cliente: Cliente): Observable<Cliente> {
    return this.http.patch<Cliente>(`${this.API_URL}/${id}`, cliente).pipe(
      tap(cliente => console.log('cliente:', cliente))
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(cliente => console.log('cliente:', cliente))
    );
  }
}
