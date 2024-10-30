import { Routes } from '@angular/router';

export const USUARIO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/usuario-index/usuario-index.component')
        .then(c => c.UsuarioIndexComponent)
  },
  {
    path: 'create',
    loadComponent: () => 
      import('./pages/usuario-form/usuario-form.component')
        .then(c => c.UsuarioFormComponent),
    title: 'Crear Usuario'
  },
  {
    path: 'edit/:id',
    loadComponent: () => 
      import('./pages/usuario-form/usuario-form.component')
        .then(c => c.UsuarioFormComponent),
    title: 'Editar Usuario'
  }
];