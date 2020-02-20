import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AllEmployeeComponent } from './components/all-employee/all-employee.component';
import { NewReimbursementComponent } from './components/new-reimbursement/new-reimbursement.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { AllReimbursementComponent } from './components/all-reimbursement/all-reimbursement.component';
import { MyReimbursementComponent } from './components/my-reimbursement/my-reimbursement.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'employees', component: AllEmployeeComponent},
  {path: 'reimbursements', component: AllReimbursementComponent},
  {path: 'my/reimbursements', component: MyReimbursementComponent},
  {path: 'new/reimbursement', component: NewReimbursementComponent},
  {path: 'new/employee', component: NewEmployeeComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
