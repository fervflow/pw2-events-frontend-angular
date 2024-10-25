import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../usuario.service';

@Component({
  selector: 'app-usuario-index',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './usuario-index.component.html',
  styleUrl: './usuario-index.component.less'
})
export class UsuarioIndexComponent {
  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.getAll()
      .subscribe(usuarios => this.usuarios = usuarios as any[]);
  }

  deleteUsuario(id: string) {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.usuarioService.delete(id)
        .subscribe(() => this.loadUsuarios());
    }
  }
}
