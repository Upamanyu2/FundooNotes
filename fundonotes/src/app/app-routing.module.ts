import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { SignupComponentComponent } from './component/signup-component/signup-component.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HomeComponent } from './component/home/home.component';
const routes: Routes = [
  { path: 'register', component: SignupComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'forgot-password', component:ForgotPasswordComponent },
  { path: 'resetpassword/:token', component: ResetPasswordComponent},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
     CommonModule
  ],
   declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SignupComponentComponent, LoginComponentComponent]
