import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { EventoService } from '../../evento.service';
import { EventoRequest, Evento } from '../../evento.model';
import { TuiButton } from '@taiga-ui/core';
import { Categoria } from '../../../categoria/categoria.model';
import { CategoriaService } from '../../../categoria/categoria.service';

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiButton],
  templateUrl: './evento-form.component.html',
  styleUrl: './evento-form.component.less'
})
export class EventoFormComponent {
  eventoForm!: FormGroup;
  isEditMode = false;
  eventoId: string | null = null;
  categorias$!: Observable<Categoria[]>;

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
  ) {
    this.createForm();
    this.categorias$ = this.categoriaService.getAll();
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        if (params['id']) {
          this.isEditMode = true;
          this.eventoId = params['id'];
          return this.eventoService.getById(this.eventoId!);
        }
        return of(null);
      })
    ).subscribe(evento => {
      if (evento) {
        // Format date for input[type="datetime-local"]
        const fecha = new Date(evento.fecha)
          .toISOString()
          .slice(0, 16); // YYYY-MM-DDTHH:mm format

        this.eventoForm.patchValue({
          nombre: evento.nombre,
          ubicacion: evento.ubicacion,
          fecha: fecha,
          precio: evento.precio,
          categoriaId: evento.categoria._id
        });
      }
    });
  }

  private createForm() {
    this.eventoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0)]],
      categoriaId: ['', [Validators.required]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.eventoForm.get(field);
    return formControl !== null && formControl.invalid && (formControl.dirty || formControl.touched);
  }

  onSubmit() {
    if (this.eventoForm.valid) {
      const eventoData: EventoRequest = {
        ...this.eventoForm.value,
        fecha: new Date(this.eventoForm.value.fecha).toISOString(),
        
      };
      
      const request = this.isEditMode && this.eventoId
        ? this.eventoService.update(this.eventoId, eventoData)
        : this.eventoService.create(eventoData);

      request.subscribe({
        next: () => {
          this.router.navigate(['/eventos']);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/eventos']);
  }
}