import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ReimbursementService } from 'src/app/services/reimbursement-service/reimbursement.service';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { Reimbursement } from 'src/app/models/reimbursement';

@Component({
  selector: 'app-all-reimbursement',
  templateUrl: './all-reimbursement.component.html',
  styleUrls: ['./all-reimbursement.component.css']
})
export class AllReimbursementComponent implements OnInit {

  allReims: Reimbursement[] = [];
  reims: Reimbursement[] = [];

  reimType: string = 'pending';
  searchName: string = '';

  orderSubmitDate: boolean = false;
  orderResolvedDate: boolean = false;
  orderAmount: boolean = false;
  fetchComplete: boolean = false;

  constructor(private router: Router, private authService: AuthService, private reimService: ReimbursementService, private emplService: EmployeeService) { }

  ngOnInit() {
    // if (!this.authService.empl) {
    //   this.router.navigate(['login']);
    // } else {
    //   this.getAllPendingReims();
    // }
    this.getAllPendingReims();
  }

  getAllPendingReims() {
    this.fetchComplete = false;
    this.reimService.getAllPendingReimbursement().subscribe(
      data => {
        this.allReims = data;
        this.reims = this.allReims;
        this.getEmplForReim();
      }
    ), error => {
      console.warn(error);
    }
  }

  getAllResolvedReims() {
    this.fetchComplete = false;
    this.reimService.getAllResolvedReimbursement().subscribe(
      data => {
        this.allReims = data.sort((a, b) => b.reimId - a.reimId);
        this.reims = this.allReims;
        this.getEmplForReim();
      }
    ), error => {
      console.warn(error);
    }
  }

  fetchReims() {
    if (this.reimType === 'pending') {
      this.reimType = 'resolved';
      this.getAllResolvedReims();
    } else {
      this.reimType = 'pending';
      this.getAllPendingReims();
    }
  }

  getEmplForReim() {
    let count = 0;

    this.reims.forEach(r => {
      this.emplService.getEmployeeById(r.submitById).subscribe(
        data => {
          r.employee = data;
          count++;
          if (count === this.reims.length) {
            this.fetchComplete = true;
          }
        }, error => {
          console.warn(error);
        }
      )
    })
  }

  searchEmpl() {
    this.reims = this.allReims.filter(r => `${r.employee.firstName} ${r.employee.lastName}`.toLowerCase().includes(this.searchName.toLowerCase()));
  }

  orderBySubmitDate() {
    if (!this.orderSubmitDate) {
      this.reims.sort((a, b) => a.submitDate > b.submitDate ? -1 : 1);
    } else {
      this.reims.sort((a, b) => a.submitDate > b.submitDate ? 1 : -1);
    }
    this.orderSubmitDate = !this.orderSubmitDate;
  }

  orderByResolvedDate() {
    if (!this.orderResolvedDate) {
      this.reims.sort((a, b) => a.resolvedDate > b.resolvedDate ? -1 : 1);
    } else {
      this.reims.sort((a, b) => a.resolvedDate > b.resolvedDate ? 1 : -1);
    }
    this.orderResolvedDate = !this.orderResolvedDate;
  }

  orderByAmount() {
    if (!this.orderAmount) {
      this.reims.sort((a, b) => a.amount > b.amount ? -1 : 1);
    } else {
      this.reims.sort((a, b) => a.amount > b.amount ? 1 : -1);
    }
    this.orderAmount = !this.orderAmount;
  }

  filterByResult(event) {
    if (event.target.value === 'All') {
      this.reims = this.allReims;
    } else {
      this.reims = this.allReims.filter(r => r.result == event.target.value);
    }
  }
}
