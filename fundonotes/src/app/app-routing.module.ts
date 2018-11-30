import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { SignupComponentComponent } from './component/signup-component/signup-component.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HomeComponent } from './component/home/home.component';
import { NotesComponentComponent } from './component/notes-component/notes-component.component';
import { ReminderComponentComponent } from './component/reminder-component/reminder-component.component';
import { GetDeleteComponent } from './component/get-delete/get-delete.component';
import { GetArchiveComponent } from './component/get-archive/get-archive.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { GetLabelsOnClickComponent } from './component/get-labels-on-click/get-labels-on-click.component';
import { InternetLostComponent } from './component/internet-lost/internet-lost.component';
import { QuestionAnswersComponent } from './component/question-answers/question-answers.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: SignupComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'resetpassword/:token', component: ResetPasswordComponent },
  { path: 'internet-lost', component: InternetLostComponent },
  {
    path: 'home', component: HomeComponent,
    children: [{ path: '', redirectTo: 'notes', pathMatch: 'full' },
    { path: 'notes', component: NotesComponentComponent },
    { path: 'reminder', component: ReminderComponentComponent },
    { path: 'Trash', component: GetDeleteComponent },
    { path: 'Archive', component: GetArchiveComponent },
    { path: 'Search', component: SearchBarComponent },
    { path: 'label/:params', component: GetLabelsOnClickComponent },
    { path: 'notes/:noteId/questionAnswers', component: QuestionAnswersComponent },
    
    ]
  },

  // { path: '', redirectTo: '/login', pathMatch: 'full' }
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
export const routingComponents = [SignupComponentComponent, LoginComponentComponent, ForgotPasswordComponent]
