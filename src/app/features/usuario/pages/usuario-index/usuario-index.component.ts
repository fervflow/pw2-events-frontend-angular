import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../usuario.service';
import {AsyncPipe, NgForOf} from '@angular/common';
import {TuiTable} from '@taiga-ui/addon-table';
import {TuiButton, TuiFormatNumberPipe} from '@taiga-ui/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../usuario.model';

@Component({
  selector: 'app-usuario-index',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, NgForOf, TuiFormatNumberPipe, TuiTable, TuiButton],
  templateUrl: './usuario-index.component.html',
  styleUrl: './usuario-index.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuarioIndexComponent {
  usuarios$!: Observable<Usuario[]>;

  constructor(private usuarioService: UsuarioService) {
    this.loadUsuarios();
  }

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.usuarios$ = this.usuarioService.getAll();
  }

  deleteUsuario(id: string) {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
      this.usuarioService.delete(id)
        .subscribe(() => this.loadUsuarios());
    }
  }
}
