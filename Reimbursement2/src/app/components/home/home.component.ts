import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ReimbursementService } from 'src/app/services/reimbursement-service/reimbursement.service';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  numOfPendingReim: number = 0;
  showContact: boolean = false;

  myManager: any = null;

  constructor(private router: Router, private authService: AuthService, private reimService: ReimbursementService, private emplSerivce: EmployeeService) { }

  ngOnInit() {
    if (!this.authService.empl) {
      this.router.navigate(['login']);
    } else {
      this.reimService.getPendingReimbursementsByEmplId(this.authService.empl.emplId).subscribe(
        data => {
          this.numOfPendingReim = data.length;
        }
      );
    }
  }

  contactInfo() {
    if (!this.showContact) {
      this.emplSerivce.getEmployeeById(this.authService.empl.managerId).subscribe(
        data => {
          this.myManager = data;
          this.showContact = true;
        }
      )
    } else {
      this.showContact = false;
    }
  }

}
