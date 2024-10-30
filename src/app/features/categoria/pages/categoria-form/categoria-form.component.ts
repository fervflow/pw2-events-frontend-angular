import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CategoriaService } from '../../categoria.service';
import { Categoria } from '../../categoria.model';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiButton],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.less'
})
export class CategoriaFormComponent {
  categoriaForm!: FormGroup;
  isEditMode = false;
  categoriaId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        if (params['id']) {
          this.isEditMode = true;
          this.categoriaId = params['id'];
          return this.categoriaService.getById(this.categoriaId!);
        }
        return of(null);
      })
    ).subscribe(categoria => {
      if (categoria) {
        this.categoriaForm.patchValue({
          nombre: categoria.nombre,
          // descripcion: categoria.descripcion,
        });
      }
    });
  }

  private createForm() {
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      // descripcion: ['', [Validators.required]],
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.categoriaForm.get(field);
    return formControl !== null && formControl.invalid && (formControl.dirty || formControl.touched);
  }

  onSubmit() {
    if (this.categoriaForm.valid) {
      const categoriaData: Categoria = this.categoriaForm.value;
      
      const request = this.isEditMode && this.categoriaId
        ? this.categoriaService.update(this.categoriaId, categoriaData)
        : this.categoriaService.create(categoriaData);

      request.subscribe({
        next: () => {
          this.router.navigate(['/categorias']);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/categorias']);
  }
}