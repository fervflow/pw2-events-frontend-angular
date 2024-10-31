import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventoService } from '../../evento.service';
import { AsyncPipe, NgForOf } from '@angular/common';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiButton, TuiFormatNumberPipe } from '@taiga-ui/core';
import { Observable } from 'rxjs';
import { Evento } from '../../evento.model';

@Component({
  selector: 'app-evento-index',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, NgForOf, TuiFormatNumberPipe, TuiTable, TuiButton],
  templateUrl: './evento-index.component.html',
  styleUrl: './evento-index.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventoIndexComponent {
  eventos$!: Observable<Evento[]>;

  constructor(
    private eventoService: EventoService,
    private cdr: ChangeDetectorRef,
  ) {
    this.loadEventos();
  }

  ngOnInit() {
    this.loadEventos();
  }

  loadEventos() {
    this.eventos$ = this.eventoService.getAll();
  }

  deleteEvento(id: string) {
    if (confirm('¿Está seguro de eliminar este evento?')) {
      this.eventoService.delete(id)
        .subscribe(() => {
          this.loadEventos();
          this.cdr.markForCheck();
        });
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}