import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AllEmployeeComponent } from './components/all-employee/all-employee.component';
import { NewReimbursementComponent } from './components/new-reimbursement/new-reimbursement.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { AllReimbursementComponent } from './components/all-reimbursement/all-reimbursement.component';
import { PendingReimbursementComponent } from './components/pending-reimbursement/pending-reimbursement.component';
import { ResolvedReimbursementComponent } from './components/resolved-reimbursement/resolved-reimbursement.component';
import { ReimbursementComponent } from './components/reimbursement/reimbursement.component';
import { EmployeeComponent } from './components/employee/employee.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'my/profile', component: ProfileComponent},
  {path: 'employees/all', component: AllEmployeeComponent},
  {path: 'employees/:id', component: EmployeeComponent},
  {path: 'reimbursements/all', component: AllReimbursementComponent},
  {path: 'my/reimbursements/pending', component: PendingReimbursementComponent},
  {path: 'my/reimbursements/resolved', component: ResolvedReimbursementComponent},
  {path: 'reimbursements/:id', component: ReimbursementComponent},
  {path: 'new/reimbursement', component: NewReimbursementComponent},
  {path: 'new/employee', component: NewEmployeeComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
