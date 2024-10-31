import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Evento, EventoRequest } from './evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private readonly API_URL = 'http://localhost:3000/evento';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.API_URL).pipe(
      tap(eventos => console.log('Eventos:', eventos))
    );
  }

  getById(id: string): Observable<Evento> {
    return this.http.get<Evento>(`${this.API_URL}/${id}`).pipe(
      tap(evento => console.log('Evento:', evento))
    );
  }

  create(evento: EventoRequest): Observable<Evento> {
    return this.http.post<Evento>(this.API_URL, evento).pipe(
      tap(evento => console.log('Evento:', evento))
    );
  }

  update(id: string, evento: EventoRequest): Observable<Evento> {
    return this.http.patch<Evento>(`${this.API_URL}/${id}`, evento).pipe(
      tap(evento => console.log('Evento:', evento))
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(evento => console.log('Evento:', evento))
    );
  }
}