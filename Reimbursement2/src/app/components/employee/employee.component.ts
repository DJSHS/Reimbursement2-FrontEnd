import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { DepartmentService } from 'src/app/services/department-service/department.service';
import { Employee } from 'src/app/models/employee';
import { Department } from 'src/app/models/department';
import { ReimbursementService } from 'src/app/services/reimbursement-service/reimbursement.service';
import { Reimbursement } from 'src/app/models/reimbursement';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  currentEmpl: Employee = new Employee();
  currentDept: Department = new Department();
  allReim: Reimbursement[] = [];

  numOfReim: number = 0;
  totalAmountOfReim: number = 0;

  confirmDelete: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private emplService: EmployeeService, private deptService: DepartmentService, private reimService: ReimbursementService, private modalService: NgbModal) { }

  ngOnInit() {
    if (!this.authService.empl || !this.authService.empl.isManager) {
      this.router.navigate(['login']);
    } else {
      this.route.params.subscribe(param => {
        this.currentEmpl.emplId = param['id'];
        this.getCurrentEmpl(this.currentEmpl.emplId);
      })
    }
  }

  getCurrentEmpl(emplId) {
    this.emplService.getEmployeeById(emplId).subscribe(
      data => {
        if (!data) {
          this.router.navigate(['home']);
        } else if (!this.authService.empl.isManager) {
          this.router.navigate(['home']);
        } else {
          this.currentEmpl = data;
          this.getCurrentDept(this.currentEmpl.deptId);
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

  deleteEmpl() {
    if (this.confirmDelete === 'Confirm') {
      this.modalService.dismissAll();
      this.emplService.deleteEmployee(this.currentEmpl.emplId).then(
        data => {
          if (!data) {
            this.router.navigate(['employees/all']);
          }
        }
      )
    } else {
      this.confirmDelete = '';
    }
  }

  getAllReimsByEmpl() {
    this.reimService.getAllReimbursementsByEmplId(this.currentEmpl.emplId).subscribe(
      data => {
        if (data) {
          this.allReim = data;
          this.numOfReim = this.allReim.length;
          this.totalAmountOfReim = this.allReim.filter(r => r.status === 'resolved').reduce((a, c) => a += c.amount, 0);
        }
      }, error => {
        console.warn(error);
      }
    )
  }

  openAlertModal(content) {
    this.modalService.open(content, { centered: true });
	}

}
