import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'usuarios',
        loadChildren: () => import('./features/usuario/usuario.routes').then(r => r.USUARIO_ROUTES),
        title: 'Usuarios'
      },
      {
        path: 'clientes',
        loadChildren: () => import('./features/cliente/cliente.routes').then(r => r.CLIENTE_ROUTES),
        title: 'Clientes'
      },
      {
        path: 'categorias',
        loadChildren: () => import('./features/categoria/categoria.routes').then(r => r.CATEGORIA_ROUTES),
        title: 'Categorías'
      },
      {
        path: 'eventos',
        loadChildren: () => import('./features/evento/evento.routes').then(r => r.EVENTO_ROUTES),
        title: 'Eventos'
      },
      {
        path: 'publicaciones',
        loadChildren: () => import('./features/publicacion/publicacion.routes').then(r => r.PUBLICACION_ROUTES),
        title: 'Publicaciones'
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent),
    title: 'Iniciar Sesión'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
