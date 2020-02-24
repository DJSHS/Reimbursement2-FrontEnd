import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ReimbursementService } from 'src/app/services/reimbursement-service/reimbursement.service';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { DepartmentService } from 'src/app/services/department-service/department.service';
import { Reimbursement } from 'src/app/models/reimbursement';
import { Employee } from 'src/app/models/employee';
import { Department } from 'src/app/models/department';

@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.component.html',
  styleUrls: ['./reimbursement.component.css']
})
export class ReimbursementComponent implements OnInit {

  currentReim: Reimbursement = new Reimbursement();
  currentEmpl: Employee = new Employee();
  currentDept: Department = new Department();
  resolvedByEmpl: Employee = new Employee();

  originalReim: Reimbursement;
  editable: string = '';
  changed: boolean = false;
  success: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private reimService: ReimbursementService, private emplService: EmployeeService, private deptService: DepartmentService) { }

  ngOnInit() {
    if (!this.authService.empl) {
      this.router.navigate(['login']);
    } else {
      this.route.params.subscribe(param => {
        this.currentReim.reimId = param['id'];
        this.getCurrentReim(this.currentReim.reimId);
      })
    }
  }

  getCurrentReim(reimId) {
    this.reimService.getReimbursementById(reimId).subscribe(
      data => {
        if (!data) {
          this.router.navigate(['home']);
        } else if (data.submitById !== this.authService.empl.emplId && !this.authService.empl.isManager) {
          this.router.navigate(['home']);
        } else {
          this.currentReim = data;
          this.originalReim = Object.assign({}, this.currentReim);
          this.getCurrentEmpl(this.currentReim.submitById);
          if (this.currentReim.resolvedById) {
            this.getCurrentEmpl(this.currentReim.resolvedById, true);
          }
        }
      }, error => {
        console.warn(error);
      }
    )
  }

  getCurrentEmpl(emplId, getResolvedInfo: boolean = false) {
    this.emplService.getEmployeeById(emplId).subscribe(
      data => {
        if (!getResolvedInfo) {
          this.currentEmpl = data;
          this.getCurrentDept(this.currentEmpl.deptId);
        } else {
          this.resolvedByEmpl = data;
        }
      }, error => {
        console.warn(error);
      }
    )
  }

  getCurrentDept(deptId) {
    this.deptService.getDeptById(deptId).subscribe(
      data => {
        this.currentDept = data;
      }, error => {
        console.warn(error);
      }
    )
  }

  update() {
    this.currentReim.submitDate = new Date().toISOString().slice(0, 10)
    this.editable = '';

    this.reimService.updateReimbursement(this.currentReim).then(
      response => {
        if (!response) {
          this.originalReim = Object.assign({}, this.currentReim);
          this.changed = false;
          this.success = true;
          setTimeout(() => this.success = false, 5000);
        }
      }
    )
  }

  restore() {
    this.editable = '';
    this.changed = false;
    this.currentReim.amount = this.originalReim.amount;
    this.currentReim.description = this.originalReim.description;
  }

  resolveReim(result) {
    this.currentReim.result = result;
    this.currentReim.status = 'resolved';
    this.currentReim.resolvedById = this.authService.empl.emplId;
    this.currentReim.resolvedDate = new Date().toISOString().slice(0, 10);
    this.currentReim.reason = this.currentReim.reason ? this.currentReim.reason : '';

    this.reimService.updateReimbursement(this.currentReim).then(
      response => {
        if (!response) {
          this.getCurrentReim(this.currentReim.reimId);
        }
      }
    )
  }

  delete() {
    if (window.confirm('Delete the reimbursement?')) {
      this.reimService.deleteReimbursement(this.currentReim.reimId).then(
        response => {
          if (!response) {
            this.router.navigate(['/my/reimbursements/pending']);
          }
        }
      )
    }
  }

  redirectToEmpl(e: string = 'pending') {
    if (this.authService.empl.isManager) {
      e === 'pending' ? this.router.navigate(['employees', this.currentReim.submitById]) : this.router.navigate(['employees', this.resolvedByEmpl.emplId]);
    }
  }

  edit(attribute) {
    if (this.editable === attribute) {
      this.editable = '';
    } else {
      this.editable = attribute;
    }
  }

  compareReim() {
    if (this.currentReim.amount !== this.originalReim.amount || this.currentReim.description !== this.originalReim.description) {
      this.changed = true;
    }
  }
}
