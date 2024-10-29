import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../usuario.service';
import {AsyncPipe, NgForOf} from '@angular/common';
import {TuiTable} from '@taiga-ui/addon-table';
import {TuiFormatNumberPipe} from '@taiga-ui/core';

@Component({
  selector: 'app-usuario-index',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, NgForOf, TuiFormatNumberPipe, TuiTable],
  templateUrl: './usuario-index.component.html',
  styleUrl: './usuario-index.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuarioIndexComponent {
  usuarios: any[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarioService.getAll()
      .subscribe(usuarios => {
        this.usuarios = usuarios as any[];
        console.log('Usuario-index.ts: ', this.usuarios);
      });
  }

  deleteUsuario(id: string) {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.usuarioService.delete(id)
        .subscribe(() => this.loadUsuarios());
    }
  }
}
