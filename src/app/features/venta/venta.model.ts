import { Usuario } from '../usuario/usuario.model';
import { Evento } from '../evento/evento.model';
import { Cliente } from '../cliente/cliente.model';

export interface VentaRequest {
  usuarioId: string;
  eventoId: string;
  clienteId: string;
  fecha_venta: string;
}

export interface Venta {
  _id?: string;
  fecha_venta: Date;
  usuario: Usuario;
  evento: Evento;
  cliente: Cliente;
}