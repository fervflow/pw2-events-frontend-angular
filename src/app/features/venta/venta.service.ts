import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Venta, VentaRequest } from './venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private readonly API_URL = 'http://localhost:3000/venta';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.API_URL).pipe(
      tap(ventas => console.log('Ventas:', ventas))
    );
  }

  getById(id: string): Observable<Venta> {
    return this.http.get<Venta>(`${this.API_URL}/${id}`).pipe(
      tap(venta => console.log('Venta:', venta))
    );
  }

  create(venta: VentaRequest): Observable<Venta> {
    return this.http.post<Venta>(this.API_URL, venta).pipe(
      tap(venta => console.log('Venta:', venta))
    );
  }

  update(id: string, venta: VentaRequest): Observable<Venta> {
    return this.http.patch<Venta>(`${this.API_URL}/${id}`, venta).pipe(
      tap(venta => console.log('Venta:', venta))
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(venta => console.log('Venta:', venta))
    );
  }
}
