import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { BemVindoComponent } from './bem-vindo/bem-vindo.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'bem-vindo',
    component: BemVindoComponent,
    canActivate : [AuthGuardService],
    children: [
      {
        path: '',
        loadChildren:
          "./bem-vindo/bem-vindo.module#BemVindoLayoutModule"
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes ,  { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
