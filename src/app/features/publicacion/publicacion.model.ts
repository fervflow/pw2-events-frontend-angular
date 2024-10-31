import { Evento } from "../evento/evento.model";

export interface PublicacionRequest {
  descripcion: string;
  eventoId: string;
  fecha_publicacion: string; // ISO string format
}

export interface Publicacion {
  _id?: string;
  fecha_publicacion: Date;
  descripcion: string;
  evento: Evento;
}