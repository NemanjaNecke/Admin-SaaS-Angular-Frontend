import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InvitesComponent } from './components/dashboard/invites/invites.component';
import { CompaniesComponent } from './components/dashboard/companies/companies.component';
import { IpComponent } from './components/dashboard/ip/ip.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { CreateComponent } from './components/dashboard/companies/create/create.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CreateInviteComponent } from './components/dashboard/invites/create/create.component';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CreateadminComponent } from './components/dashboard/createadmin/createadmin.component';
import { TokenRefreshInterceptor } from './services/token-refresh.interceptor';
import { AdmindetailsComponent } from './components/dashboard/admindetails/admindetails.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatTreeModule} from '@angular/material/tree';
import {MatSortModule} from '@angular/material/sort';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangepasswordComponent } from './components/profile/changepassword/changepassword.component';
import { ResendEmailVerificationComponent } from './components/register/resend-email-verification/resend-email-verification.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { ResetpasswordComponent } from './components/login/resetpassword/resetpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    InvitesComponent,
    CompaniesComponent,
    IpComponent,
    CreateComponent,
    CreateInviteComponent,
    CreateadminComponent,
    AdmindetailsComponent,
    ProfileComponent,
    ChangepasswordComponent,
    ResendEmailVerificationComponent,
    ResetpasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatSnackBarModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatTableModule,
    MatChipsModule,
    MatTreeModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenRefreshInterceptor,
      multi: true,
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
