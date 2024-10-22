import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlbumComponent } from './album/album.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'home'
    },
    {
        path: 'album',
        component: AlbumComponent,
        title: 'Album de Items'
    },
    {
        path: '**',
        redirectTo: '/'
    },
];
