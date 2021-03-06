import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading, ExtraOptions } from '@angular/router';

const routes: Routes = [];

const app_routes: Routes = [
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: 'client', loadChildren: './modules/client/client.module#ClientModule' },
  { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
  { path: '**', redirectTo: '/auth/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

// @NgModule({
//   imports: [ RouterModule.forRoot(app_routes, { preloadingStrategy: PreloadAllModules }) ],
//   exports: [ RouterModule ]
// })

export class AppRoutingModule { }
