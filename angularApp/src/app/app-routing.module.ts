import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/component/login/login.component';
import { RegistrationComponent } from 'src/app/component/registration/registration.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotpasswordComponent } from './component/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './component/resetpassword/resetpassword.component';
import {NotesComponent} from './component/notes/notes.component';
import { TrashComponent } from './component/trash/trash.component';
import { ArchiveComponent } from './component/archive/archive.component';
const routes: Routes = [
   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'dashboard', component: DashboardComponent ,
  children: [
    {
      path: '', component: NotesComponent
    },
    { path: 'trash', component: TrashComponent },
    { path: 'archive', component: ArchiveComponent }
  ]
  },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetpassword/:token', component: ResetpasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
