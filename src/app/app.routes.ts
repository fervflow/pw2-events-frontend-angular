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
