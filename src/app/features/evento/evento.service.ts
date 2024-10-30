import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventoResponse, EventoRequest } from './evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private readonly API_URL = 'http://localhost:3000/evento';

  constructor(private http: HttpClient) {}

  getAll(): Observable<EventoResponse[]> {
    return this.http.get<EventoResponse[]>(this.API_URL);
  }

  getById(id: string): Observable<EventoResponse> {
    return this.http.get<EventoResponse>(`${this.API_URL}/${id}`);
  }

  create(evento: EventoRequest): Observable<EventoResponse> {
    return this.http.post<EventoResponse>(this.API_URL, evento);
  }

  update(id: string, evento: EventoRequest): Observable<EventoResponse> {
    return this.http.patch<EventoResponse>(`${this.API_URL}/${id}`, evento);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}