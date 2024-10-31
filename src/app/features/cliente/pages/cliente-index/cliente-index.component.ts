import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { Observable } from 'rxjs';
import { Cliente } from '../../cliente.model';
import { ClienteService } from '../../cliente.service';

@Component({
  selector: 'app-cliente-index',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, TuiButton],
  templateUrl: './cliente-index.component.html',
  styleUrl: './cliente-index.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClienteIndexComponent {
  clientes$!: Observable<Cliente[]>;

  constructor(
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef,
  ) {
    this.loadClientes();
  }
  loadClientes() {
    this.clientes$ = this.clienteService.getAll();
  }

  deleteCliente(id: string) {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.clienteService.delete(id)
        .subscribe(() => {
          this.loadClientes();
          this.cdr.markForCheck();
        });
    }
  }
}
