import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/search-page-component/search-page-component').then(
        (m) => m.SearchPageComponent,
      ),
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./components/auth-page-component/auth-page-component').then(
        (m) => m.AuthPageComponent,
      ),
    data: { isSignup: true },
  },
  {
    path: 'auth/singup',
    loadComponent: () =>
      import('./components/auth-page-component/auth-page-component').then(
        (m) => m.AuthPageComponent,
      ),
    data: { isSignup: false },
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./components/search-page-component/search-page-component').then(
        (m) => m.SearchPageComponent,
      )
  },
  {
    path: 'video/:id',
    loadComponent: () =>
      import('./components/video-page-component/video-page-component').then(
        (m) => m.VideoPageComponent,
      )
  }
];
