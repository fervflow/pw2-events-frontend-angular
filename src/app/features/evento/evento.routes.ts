import { Routes } from '@angular/router';

export const EVENTO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/evento-index/evento-index.component')
        .then(c => c.EventoIndexComponent)
  },
  {
    path: 'create',
    loadComponent: () => 
      import('./pages/evento-form/evento-form.component')
        .then(c => c.EventoFormComponent),
    title: 'Crear Evento'
  },
  {
    path: 'edit/:id',
    loadComponent: () => 
      import('./pages/evento-form/evento-form.component')
        .then(c => c.EventoFormComponent),
    title: 'Editar Evento'
  }
];
