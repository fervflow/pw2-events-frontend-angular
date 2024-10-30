import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UsuarioService } from '../../usuario.service';
import { Usuario } from '../../usuario.model';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiButton],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.less'
})
export class UsuarioFormComponent {
  usuarioForm!: FormGroup;
  isEditMode = false;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
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
          this.userId = params['id'];
          // return this.usuarioService.getOne(params['id']);
          return this.usuarioService.getById(this.userId!);
        }
        return of(null);
      })
    ).subscribe(usuario => {
      if (usuario) {
        this.usuarioForm.patchValue({
          nombre: usuario.nombre,
          email: usuario.email,
          password: '',
        });
      }
    });
  }

  private createForm() {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      // password: ['', this.isEditMode ? [] : [Validators.required]],
      password: [''],
    });
    if (!this.isEditMode) {
      this.usuarioForm.get('password')?.setValidators(Validators.required);
    }
    // Update validity after setting validators
    this.usuarioForm.get('password')?.updateValueAndValidity();
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.usuarioForm.get(field);
    return formControl !== null && formControl.invalid && (formControl.dirty || formControl.touched);
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      const userData: Usuario = this.usuarioForm.value;
      
      const request = this.isEditMode && this.userId
        ? this.usuarioService.update(this.userId, userData)
        : this.usuarioService.create(userData);

      request.subscribe({
        next: () => {
          this.router.navigate(['/usuarios']);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/usuarios']);
  }
}
