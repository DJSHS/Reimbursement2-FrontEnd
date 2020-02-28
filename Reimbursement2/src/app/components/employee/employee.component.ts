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
import { ValidationService } from 'src/app/services/validation-service/validation.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  currentEmpl: Employee = new Employee();
  currentManager: Employee;
  currentDept: Department = new Department();

  allReim: Reimbursement[] = [];
  allDepts: Department[] = [];
  availableManagers: Employee[] = [];

  originalEmpl: Employee;
  managerName: string = '';
  emplName: string = '';

  numOfReim: number = 0;
  totalAmountOfReim: number = 0;

  confirmDelete: string = '';
  changed: boolean = false;
  editable: string = '';
  success: boolean = false;
  showReim: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private emplService: EmployeeService, private deptService: DepartmentService, private reimService: ReimbursementService, private validService: ValidationService, private modalService: NgbModal) { }

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
          this.emplName = `${this.currentEmpl.firstName} ${this.currentEmpl.lastName}`;
          this.originalEmpl = Object.assign({}, this.currentEmpl);

          this.getCurrentDept();
          this.getAllReimsByEmpl();
          if (this.currentEmpl.managerId) {
            this.getCurrentManager();
          }
        }
      }, error => {
        console.warn(error);
      }
    )
  }

  getCurrentDept() {
    this.deptService.getDeptById(this.currentEmpl.deptId).subscribe(
      data => {
        this.currentDept = data;
      }, error => {
        console.warn(error);
      }
    )
  }

  getCurrentManager() {
    this.emplService.getEmployeeById(this.currentEmpl.managerId).subscribe(
      data => {
        this.currentManager = data;
        this.managerName = `${this.currentManager.firstName} ${this.currentManager.lastName}`;
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
          this.allReim = data.sort((a, b) => a.submitDate > b.submitDate ? 1 : -1);
          this.numOfReim = this.allReim.filter(r => r.result === 'Approved').length;
          this.totalAmountOfReim = this.allReim.filter(r => r.result === 'Approved').reduce((a, c) => a += c.amount, 0);
        }
      }, error => {
        console.warn(error);
      }
    )
  }

  openAlertModal(content) {
    this.modalService.open(content, { centered: true });
  }

  edit(attribute) {
    if (this.editable === attribute) {
      this.editable = '';
    } else {
      this.editable = attribute;
    }

    if (this.editable === 'department') {
      this.getAllDepts();
    }

    if (this.editable === 'manager') {
      this.getAllAvailableManagers();
    }
  }

  restore() {
    this.changed = false;
    this.editable = '';
    this.currentEmpl = Object.assign({}, this.originalEmpl);
    this.currentDept = this.allDepts.find(d => d.deptId == this.currentEmpl.deptId);
    this.currentManager = this.availableManagers.find(e => e.emplId == this.currentEmpl.managerId);
    this.managerName = `${this.currentManager.firstName} ${this.currentManager.lastName}`;
  }

  updateEmployee() {
    this.currentEmpl.firstName = this.validService.nameFormat(this.currentEmpl.firstName);
    this.currentEmpl.lastName = this.validService.nameFormat(this.currentEmpl.lastName);

    this.changed = false;
    this.editable = '';

    this.emplService.updateEmployee(this.currentEmpl).then(
      data => {
        if (!data) {
          this.route.params.subscribe(param => {
            this.currentEmpl.emplId = param['id'];
            this.getCurrentEmpl(this.currentEmpl.emplId);

            this.success = true;
            setTimeout(() => this.success = false, 5000);
          })
        }
      }
    )
  }

  showReimByEmpl() {
    this.showReim = !this.showReim;
  }

  getAllDepts() {
    this.deptService.getAllDepts().subscribe(
      data => {
        if (data) {
          this.allDepts = data.filter(d => d.deptId === this.currentEmpl.deptId).concat(data.filter(d => d.deptId !== this.currentEmpl.deptId));
        }
      }, error => {
        console.warn(error);
      }
    )
  }

  getAllAvailableManagers() {
    this.emplService.getAllEmployees().subscribe(
      data => {
        if (data) {
          this.availableManagers = data.filter(e => (e.deptId == this.currentEmpl.deptId && e.isManager > this.currentEmpl.isManager) || e.emplId === this.currentEmpl.managerId);
        }
      }, error => {
        console.warn(error);
      }
    )
  }

  changeDept(event) {
    this.changed = true;
    this.currentEmpl.deptId = event.target.value;
    this.currentDept = this.allDepts.find(d => d.deptId == this.currentEmpl.deptId);
  }

  changeManager(event) {
    this.changed = true;
    this.currentEmpl.managerId = event.target.value;
    this.currentManager = this.availableManagers.find(e => e.emplId == this.currentEmpl.managerId);
    this.managerName = `${this.currentManager.firstName} ${this.currentManager.lastName}`;
  }

}
