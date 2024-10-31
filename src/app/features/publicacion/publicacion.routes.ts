import { Routes } from '@angular/router';

export const PUBLICACION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/publicacion-index/publicacion-index.component')
        .then(c => c.PublicacionIndexComponent)
  },
  {
    path: 'create',
    loadComponent: () => 
      import('./pages/publicacion-form/publicacion-form.component')
        .then(c => c.PublicacionFormComponent),
    title: 'Crear Publicación'
  },
  {
    path: 'edit/:id',
    loadComponent: () => 
      import('./pages/publicacion-form/publicacion-form.component')
        .then(c => c.PublicacionFormComponent),
    title: 'Editar Publicación'
  }
];