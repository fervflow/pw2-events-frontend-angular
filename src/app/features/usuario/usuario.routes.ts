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
      import('./pages/usuario-create/usuario-create.component')
        .then(c => c.UsuarioCreateComponent),
    title: 'Crear Usuario'
  },
  {
    path: 'edit/:id',
    loadComponent: () => 
      import('./pages/usuario-edit/usuario-edit.component')
        .then(c => c.UsuarioEditComponent),
    title: 'Editar Usuario'
  }
];