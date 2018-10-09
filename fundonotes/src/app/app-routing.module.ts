import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { SignupComponentComponent } from './signup-component/signup-component.component';
import { EmployeeListComponent } from './employee-list/employee-list.component'

const routes: Routes = [
  { path: 'register', component: SignupComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'list', component: EmployeeListComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // CommonModule
  ],
  // declarations: []
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SignupComponentComponent, LoginComponentComponent]
