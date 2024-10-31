import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { PublicacionService } from '../../publicacion.service';
import { PublicacionRequest } from '../../publicacion.model';
import { TuiButton } from '@taiga-ui/core';
import { EventoService } from '../../../evento/evento.service';
import { Evento } from '../../../evento/evento.model';

@Component({
  selector: 'app-publicacion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiButton],
  templateUrl: './publicacion-form.component.html',
  styleUrl: './publicacion-form.component.less'
})
export class PublicacionFormComponent {
  publicacionForm!: FormGroup;
  isEditMode = false;
  publicacionId: string | null = null;
  eventos$!: Observable<Evento[]>;

  constructor(
    private fb: FormBuilder,
    private publicacionService: PublicacionService,
    private eventoService: EventoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
    this.eventos$ = this.eventoService.getAll();
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        if (params['id']) {
          this.isEditMode = true;
          this.publicacionId = params['id'];
          return this.publicacionService.getById(this.publicacionId!);
        }
        return of(null);
      })
    ).subscribe(publicacion => {
      if (publicacion) {
        this.publicacionForm.patchValue({
          descripcion: publicacion.descripcion,
          eventoId: publicacion.evento._id
        });
      }
    });
  }

  private createForm() {
    this.publicacionForm = this.fb.group({
      descripcion: ['', [Validators.required]],
      eventoId: ['', [Validators.required]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.publicacionForm.get(field);
    return formControl !== null && formControl.invalid && (formControl.dirty || formControl.touched);
  }

  onSubmit() {
    if (this.publicacionForm.valid) {
      // Get the form values
      const formValues = this.publicacionForm.value;
      
      // Create the request object with the current date
      const publicacionData: PublicacionRequest = {
        ...formValues,
        fecha_publicacion: new Date().toISOString() // Current date and time in ISO format
      };
      
      const request = this.isEditMode && this.publicacionId
        ? this.publicacionService.update(this.publicacionId, publicacionData)
        : this.publicacionService.create(publicacionData);

      request.subscribe({
        next: () => {
          this.router.navigate(['/publicaciones']);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/publicaciones']);
  }
}