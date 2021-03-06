import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AgregarComponent } from './heroes/pages/agregar/agregar.component';
import { AuthGuard } from './auth/guards/auth.guard';


const routes : Routes = [
  {
    path: 'auth',
    loadChildren : () => import('./auth/auth.module').then( m => m.AuthModule)
     //para cargar modulo
  },
  {
    path : 'heroes',
    loadChildren : () => import('./heroes/heroes.module').then ( m=> m.HeroesModule),
    canLoad : [ AuthGuard],
    canActivate : [AuthGuard],
  },
  {
    path : '404',
    component : ErrorPageComponent
  },
  {
    path: '**',
    redirectTo : 'auth'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: 
  [
    RouterModule
  ]
})
export class AppRoutingModule { }
