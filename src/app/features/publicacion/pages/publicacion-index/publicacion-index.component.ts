import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicacionService } from '../../publicacion.service';
import { AsyncPipe, NgForOf, DatePipe } from '@angular/common';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiButton } from '@taiga-ui/core';
import { Observable } from 'rxjs';
import { Publicacion } from '../../publicacion.model';

@Component({
  selector: 'app-publicacion-index',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, NgForOf, DatePipe, TuiTable, TuiButton],
  templateUrl: './publicacion-index.component.html',
  styleUrl: './publicacion-index.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicacionIndexComponent {
  publicaciones$!: Observable<Publicacion[]>;

  constructor(
    private publicacionService: PublicacionService,
    private cdr: ChangeDetectorRef,
  ) {
    this.loadPublicaciones();
  }

  ngOnInit() {
    this.loadPublicaciones();
  }

  loadPublicaciones() {
    this.publicaciones$ = this.publicacionService.getAll();
  }

  deletePublicacion(id: string) {
    if (confirm('¿Está seguro de eliminar esta publicación?')) {
      this.publicacionService.delete(id)
        .subscribe(() => {
          this.loadPublicaciones();
          this.cdr.markForCheck();
        });
    }
  }
}