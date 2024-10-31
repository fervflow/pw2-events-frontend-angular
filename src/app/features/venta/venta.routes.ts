import { Routes } from '@angular/router';

export const VENTA_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/venta-index/venta-index.component')
        .then(c => c.VentaIndexComponent)
  },
  {
    path: 'create',
    loadComponent: () => 
      import('./pages/venta-form/venta-form.component')
        .then(c => c.VentaFormComponent),
    title: 'Crear Venta'
  },
  {
    path: 'edit/:id',
    loadComponent: () => 
      import('./pages/venta-form/venta-form.component')
        .then(c => c.VentaFormComponent),
    title: 'Editar Venta'
  }
];
