import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ReimbursementService } from 'src/app/services/reimbursement-service/reimbursement.service';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { DepartmentService } from 'src/app/services/department-service/department.service';
import { Reimbursement } from 'src/app/models/reimbursement';

@Component({
  selector: 'app-all-reimbursement',
  templateUrl: './all-reimbursement.component.html',
  styleUrls: ['./all-reimbursement.component.css']
})
export class AllReimbursementComponent implements OnInit {

  allPendingReims: Reimbursement[] = [];
  allResolvedReims: Reimbursement[] = [];
  allReims: Reimbursement[] = [];

  constructor(private router: Router, private authService: AuthService, private reimService: ReimbursementService, private emplService: EmployeeService, private deptService: DepartmentService) { }

  ngOnInit() {
    // if (!this.authService.empl) {
    //   this.router.navigate(['login']);
    // } else {
    //   this.getAllPendingReims();
    // }
    this.getAllPendingReims();
  }

  getAllPendingReims() {
    this.reimService.getAllPendingReimbursement().subscribe(
      data => {
        this.allPendingReims = data;
        console.log(this.allPendingReims);
      }
    ), error => {
      console.warn(error);
    }
  }

  getAllResolvedReims() {
    this.reimService.getAllResolvedReimbursement().subscribe(
      data => {
        this.allResolvedReims = data;
        console.log(this.allResolvedReims);
      }
    ), error => {
      console.warn(error);
    }
  }

  getAllReims() {
    this.reimService.getAllReimbursements().subscribe(
      data => {
        this.allReims = data;
        console.log(this.allReims);
      }
    ), error => {
      console.warn(error);
    }
  }
}
