import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './components/dashboard/companies/companies.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvitesComponent } from './components/dashboard/invites/invites.component';
import { IpComponent } from './components/dashboard/ip/ip.component';
import { ConfirmPasswordResetComponent } from './components/login/confirm-password-reset/confirm-password-reset.component';
import { LoginComponent } from './components/login/login.component';
import { ResetpasswordComponent } from './components/login/resetpassword/resetpassword.component';
import { NavComponent } from './components/nav/nav.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { TasksComponent } from './components/tasks/tasks.component';

import { IsLoggedGuard } from './is-logged.guard';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  { path: '', 
  redirectTo: 'login', 
  pathMatch: 'full' },
  
  {
    path:'login',
    component:LoginComponent,
    canActivate:[IsLoggedGuard]
  }
  ,
  {
    path: 'auth/register/:uid/:token',
    component: RegisterComponent,
    //canActivate: [RegistrationGuardGuard]
  },
  {
    path: 'auth/password/reset/confirm/:uid/:token',
    component: ConfirmPasswordResetComponent
  }
  ,
  {
    path: 'home',
    component: NavComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'companies', component: CompaniesComponent },
      { path: 'invites', component: InvitesComponent },
      { path: 'ip-address', component: IpComponent },
      { path: 'tasks', component: TasksComponent },

  {
    path: 'profile',
    component: ProfileComponent,
  }
    ]
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
// {
//   path: 'changePassword',
//   component: ChangepasswordComponent,
//   canActivate: [LoginGuard]
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
