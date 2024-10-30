import { Categoria } from "../categoria/categoria.model";

export interface EventoResponse {
  _id: string;
  nombre: string;
  ubicacion: string;
  fecha: string;  // or Date if you prefer to handle conversion
  precio: number;
  categoria: Categoria;
}

export interface EventoRequest {
  nombre: string;
  ubicacion: string;
  fecha: string;
  precio: number;
  categoriaId: string;
}