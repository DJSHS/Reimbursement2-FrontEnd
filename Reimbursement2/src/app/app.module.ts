import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyReimbursementComponent } from './components/my-reimbursement/my-reimbursement.component';
import { AllReimbursementComponent } from './components/all-reimbursement/all-reimbursement.component';
import { NewReimbursementComponent } from './components/new-reimbursement/new-reimbursement.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { AllEmployeeComponent } from './components/all-employee/all-employee.component';
import { ReimbursementComponent } from './components/reimbursement/reimbursement.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { PendingReimbursementComponent } from './components/pending-reimbursement/pending-reimbursement.component';
import { ResolvedReimbursementComponent } from './components/resolved-reimbursement/resolved-reimbursement.component';
import { EmployeeComponent } from './components/employee/employee.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    MyReimbursementComponent,
    AllReimbursementComponent,
    NewReimbursementComponent,
    NewEmployeeComponent,
    AllEmployeeComponent,
    ReimbursementComponent,
    LoginComponent,
    PendingReimbursementComponent,
    ResolvedReimbursementComponent,
    EmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
