import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
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
  }
  ,
  {
    path: 'home',
    component: NavComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  }
//   {
//     path: 'profile',
//     component: ProfileComponent,
//     canActivate: [LoginGuard]
//   },
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
