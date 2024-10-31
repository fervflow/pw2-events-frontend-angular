import { Categoria } from "../categoria/categoria.model";

export interface Evento {
  _id: string;
  nombre: string;
  ubicacion: string;
  fecha: string;
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