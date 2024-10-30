import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriaService } from '../../categoria.service';
import { AsyncPipe } from '@angular/common';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiButton, TuiFormatNumberPipe } from '@taiga-ui/core';
import { Observable } from 'rxjs';
import { Categoria } from '../../categoria.model';

@Component({
  selector: 'app-categoria-index',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, TuiFormatNumberPipe, TuiTable, TuiButton],
  templateUrl: './categoria-index.component.html',
  styleUrl: './categoria-index.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriaIndexComponent {
  categorias$!: Observable<Categoria[]>;

  constructor(private categoriaService: CategoriaService) {
    this.loadCategorias();
  }

  ngOnInit() {
    this.loadCategorias();
  }

  loadCategorias() {
    this.categorias$ = this.categoriaService.getAll();
  }

  deleteCategoria(id: string) {
    if (confirm('¿Está seguro de eliminar esta categoría?')) {
      this.categoriaService.delete(id)
        .subscribe(() => this.loadCategorias());
    }
  }
}