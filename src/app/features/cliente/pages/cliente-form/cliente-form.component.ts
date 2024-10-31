import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButton } from '@taiga-ui/core';
import { ClienteService } from '../../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Cliente } from '../../cliente.model';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiButton],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.less'
})
export class ClienteFormComponent {
  clienteForm!: FormGroup;
  isEditMode = false;
  clienteId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        if (params['id']) {
          this.isEditMode = true;
          this.clienteId = params['id'];
          return this.clienteService.getById(this.clienteId!);
        }
        return of(null);
      })
    ).subscribe(cliente => {
      if (cliente) {
        this.clienteForm.patchValue({
          nombres: cliente.nombres,
          apellidos: cliente.apellidos,
          telefono: cliente.telefono,
          email: cliente.email,
        });
      }
    });
  }
  createForm() {
    this.clienteForm = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: [''],
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.clienteForm.get(field);
    return formControl !== null && formControl.invalid && (formControl.dirty || formControl.touched);
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      const clienteData: Cliente = this.clienteForm.value;

      if (!clienteData.email) {
        delete clienteData.email;
      }
      
      const request = this.isEditMode && this.clienteId
        ? this.clienteService.update(this.clienteId, clienteData)
        : this.clienteService.create(clienteData);

      request.subscribe({
        next: () => {
          this.onCancel();
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/clientes']);
  }
}
