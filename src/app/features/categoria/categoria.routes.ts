import { Routes } from '@angular/router';

export const CATEGORIA_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => 
      import('./pages/categoria-index/categoria-index.component')
        .then(c => c.CategoriaIndexComponent)
  },
  {
    path: 'create',
    loadComponent: () => 
      import('./pages/categoria-form/categoria-form.component')
        .then(c => c.CategoriaFormComponent),
    title: 'Crear Categoría'
  },
  {
    path: 'edit/:id',
    loadComponent: () => 
      import('./pages/categoria-form/categoria-form.component')
        .then(c => c.CategoriaFormComponent),
    title: 'Editar Categoría'
  }
];