import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { SignupComponentComponent } from './component/signup-component/signup-component.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HomeComponent } from './component/home/home.component';
import { NavigationBarComponent } from './component/navigation-bar/navigation-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { NotesComponentComponent } from './component/notes-component/notes-component.component';
import { ReminderComponentComponent } from './component/reminder-component/reminder-component.component';
import { MatMenuModule } from '@angular/material/menu';
import { AddNotesComponent } from './component/add-notes/add-notes.component';
import { NoteCardComponent } from './component/note-card/note-card.component';
import { MoreComponent } from './component/more/more.component';
import { ThemeComponent } from './component/theme/theme.component';
import { GetArchiveComponent } from './component/get-archive/get-archive.component';
import { PostArchiveComponent } from './component/post-archive/post-archive.component';
import { GetDeleteComponent } from './component/get-delete/get-delete.component';
import { EditComponent } from './component/edit/edit.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    SignupComponentComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    HomeComponent,
    NavigationBarComponent,
    NavBarComponent,
    NotesComponentComponent,
    ReminderComponentComponent,
    AddNotesComponent,
    NoteCardComponent,
    MoreComponent,
    ThemeComponent,
    GetArchiveComponent,
    PostArchiveComponent,
    GetDeleteComponent,
    EditComponent
   
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    AppRoutingModule,
    MatIconModule,
    MatButtonToggleModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[EditComponent,NoteCardComponent]
})
export class AppModule { }
