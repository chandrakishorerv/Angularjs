import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from 'src/app/component/login/login.component';
import { RegistrationComponent } from 'src/app/component/registration/registration.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/material/MaterialModule';
import {AppRoutingModule} from './app-routing.module';
import { UserservicesService } from './services/userservices.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatRadioModule} from '@angular/material/radio';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import { NotesComponent } from './component/notes/notes.component';
import { EditNoteComponent } from './component/edit-note/edit-note.component';
import { EditLabelComponent } from './component/edit-label/edit-label.component';
import { TrashComponent } from './component/trash/trash.component';
import { ArchiveComponent } from './component/archive/archive.component';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    NotesComponent,
    EditNoteComponent,
    EditLabelComponent,
    TrashComponent,
    ArchiveComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot([]),
    FormsModule , HttpClientModule,
   MaterialModule, ReactiveFormsModule,
   FlexLayoutModule, MatRadioModule
  ],
  entryComponents: [
   EditNoteComponent, EditLabelComponent
],
  providers: [UserservicesService],
  bootstrap: [AppComponent]
})
export class AppModule {  }
