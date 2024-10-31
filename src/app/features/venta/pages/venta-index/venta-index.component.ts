import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VentaService } from '../../venta.service';
import { AsyncPipe, NgForOf, DatePipe } from '@angular/common';
import { TuiButton } from '@taiga-ui/core';
import { Observable } from 'rxjs';
import { Venta } from '../../venta.model';

@Component({
  selector: 'app-venta-index',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, NgForOf, DatePipe, TuiButton],
  templateUrl: './venta-index.component.html',
  styleUrl: './venta-index.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VentaIndexComponent {
  ventas$!: Observable<Venta[]>;

  constructor(
    private ventaService: VentaService,
    private cdr: ChangeDetectorRef,
  ) {
    this.loadVentas();
  }

  ngOnInit() {
    this.loadVentas();
  }

  loadVentas() {
    this.ventas$ = this.ventaService.getAll();
  }

  deleteVenta(id: string) {
    if (confirm('¿Está seguro de eliminar esta venta?')) {
      this.ventaService.delete(id)
        .subscribe(() => {
          this.loadVentas();
          this.cdr.markForCheck();
        });
    }
  }
}