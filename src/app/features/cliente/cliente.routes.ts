import { Routes } from '@angular/router';

export const CLIENTE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/cliente-index/cliente-index.component').then(c => c.ClienteIndexComponent)
  },
  {
    path: 'create',
    loadComponent: () => 
      import('./pages/cliente-form/cliente-form.component').then(c => c.ClienteFormComponent),
    title: 'Crear Cliente'
  },
  {
    path: 'edit/:id',
    loadComponent: () => 
      import('./pages/cliente-form/cliente-form.component').then(c => c.ClienteFormComponent),
    title: 'Editar Cliente'
  }
];