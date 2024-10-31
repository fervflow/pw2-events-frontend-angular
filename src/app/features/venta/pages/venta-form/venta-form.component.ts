import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { VentaService } from '../../venta.service';
import { VentaRequest } from '../../venta.model';
import { TuiButton } from '@taiga-ui/core';
import { EventoService } from '../../../evento/evento.service';
import { UsuarioService } from '../../../usuario/usuario.service';
import { ClienteService } from '../../../cliente/cliente.service';
import { Evento } from '../../../evento/evento.model';
import { Usuario } from '../../../usuario/usuario.model';
import { Cliente } from '../../../cliente/cliente.model';

@Component({
  selector: 'app-venta-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiButton],
  templateUrl: './venta-form.component.html',
  styleUrl: './venta-form.component.less'
})
export class VentaFormComponent {
  ventaForm!: FormGroup;
  isEditMode = false;
  ventaId: string | null = null;
  
  eventos$!: Observable<Evento[]>;
  usuarios$!: Observable<Usuario[]>;
  clientes$!: Observable<Cliente[]>;

  constructor(
    private fb: FormBuilder,
    private ventaService: VentaService,
    private eventoService: EventoService,
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
    this.eventos$ = this.eventoService.getAll();
    this.usuarios$ = this.usuarioService.getAll();
    this.clientes$ = this.clienteService.getAll();
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        if (params['id']) {
          this.isEditMode = true;
          this.ventaId = params['id'];
          return this.ventaService.getById(this.ventaId!);
        }
        return of(null);
      })
    ).subscribe(venta => {
      if (venta) {
        this.ventaForm.patchValue({
          usuarioId: venta.usuario._id,
          eventoId: venta.evento._id,
          clienteId: venta.cliente._id
        });
      }
    });
  }

  private createForm() {
    this.ventaForm = this.fb.group({
      usuarioId: ['', [Validators.required]],
      eventoId: ['', [Validators.required]],
      clienteId: ['', [Validators.required]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.ventaForm.get(field);
    return formControl !== null && formControl.invalid && (formControl.dirty || formControl.touched);
  }

  onSubmit() {
    if (this.ventaForm.valid) {
      const formValues = this.ventaForm.value;
      
      const ventaData: VentaRequest = {
        ...formValues,
        fecha_venta: new Date().toISOString()
      };
      
      const request = this.isEditMode && this.ventaId
        ? this.ventaService.update(this.ventaId, ventaData)
        : this.ventaService.create(ventaData);

      request.subscribe({
        next: () => {
          this.router.navigate(['/ventas']);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/ventas']);
  }
}