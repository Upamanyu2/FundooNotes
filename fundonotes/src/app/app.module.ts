/*------------------------------------------------------------------------------ */
      /*-----------Componnets module imported------------------ */

import { AppComponent } from './app.component';
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { SignupComponentComponent } from './component/signup-component/signup-component.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { HomeComponent } from './component/home/home.component';
import { NavigationBarComponent } from './component/navigation-bar/navigation-bar.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { NotesComponentComponent } from './component/notes-component/notes-component.component';
import { ReminderComponentComponent } from './component/reminder-component/reminder-component.component';
import { AddNotesComponent } from './component/add-notes/add-notes.component';
import { NoteCardComponent } from './component/note-card/note-card.component';
import { MoreComponent } from './component/more/more.component';
import { ThemeComponent } from './component/theme/theme.component';
import { GetArchiveComponent } from './component/get-archive/get-archive.component';
import { PostArchiveComponent } from './component/post-archive/post-archive.component';
import { GetDeleteComponent } from './component/get-delete/get-delete.component';
import { EditComponent } from './component/edit/edit.component';
import { LabelCreateComponent } from './component/label-create/label-create.component';
import { AddLabelComponent } from './component/add-label/add-label.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { SearchPipe } from './core/pipe/searchPipe/search.pipe';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { GetLabelsOnClickComponent } from './component/get-labels-on-click/get-labels-on-click.component';
import { SmallSearchPipe } from '././core/pipe/searchSmallPipe/small-search.pipe';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';
import { ReminderComponent } from './component/reminder/reminder.component';
import { ImageComponent } from './component/image/image.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material";

/*------------------------------------------------------------------------------ */
      /*-----------Routing module imported------------------ */
import { AppRoutingModule } from './app-routing.module';

/*------------------------------------------------------------------------------ */
      /*-----------Angular module imported------------------ */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatSidenavModule, MatListModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ProfilePhotoComponent } from './component/profile-photo/profile-photo.component';


/*------------------------------------------------------------------------------ */








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
    EditComponent,
    LabelCreateComponent,
    AddLabelComponent,
    SearchPipe,
    SearchBarComponent,
    GetLabelsOnClickComponent,
    SmallSearchPipe,
    CollaboratorComponent,
    ReminderComponent,
    ImageComponent,
    ProfilePhotoComponent



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
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    MatChipsModule,
    ImageCropperModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EditComponent, NoteCardComponent, LabelCreateComponent, AddLabelComponent, NavigationBarComponent, ProfilePhotoComponent]

})
export class AppModule { }
