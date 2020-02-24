import { Component, OnInit } from '@angular/core';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { DepartmentService } from 'src/app/services/department-service/department.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Department } from 'src/app/models/department';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  allDepts: Department[] = [];
  allManagers: Employee[] = [];

  newEmpl: Employee = new Employee();

  submit: boolean = false;
  fail: boolean = false;
  isUnqiueEmail: boolean = true;
  isUniquePhone: boolean = true;

  constructor(private router: Router, private validService: ValidationService, private authService: AuthService, private emplService: EmployeeService, private deptService: DepartmentService) { }

  ngOnInit() {
    if (!this.authService.empl || !this.authService.empl.isManager) {
      this.router.navigate(['login']);
    } else {
      this.getAllDetpts();
    }
  }

  getAllDetpts() {
    this.deptService.getAllDepts().subscribe(
      data => {
        this.allDepts = data;
      }, error => {
        console.warn(error);
      }
    )
  }

  getManagers() {
    this.emplService.getAllEmployees().subscribe(
      data => {
        this.allManagers = data.filter(e => e.deptId == this.newEmpl.deptId && e.isManager);
      }, error => {
        console.warn(error);
      }
    )
  }

  changeDept(event) {
    this.newEmpl.deptId = event.target.value;
    this.newEmpl.managerId = 0;
    this.getManagers();
  }

  changeManager(event) {
    this.newEmpl.managerId = event.target.value;
  }

  validateInput() {
    return this.validService.validateName(this.newEmpl.firstName) && this.validService.validateName(this.newEmpl.lastName) && this.validService.validateEmail(this.newEmpl.email) && this.validService.validatePhone(this.newEmpl.phone) && this.newEmpl.deptId && this.newEmpl.position;
  }

  uniqueEmail() {
    if (this.validService.validateEmail(this.newEmpl.email)) {
      this.emplService.checkUniquenessForEmail(this.newEmpl.email).then(
        data => {
          this.isUnqiueEmail = data ? true : false;
        }
      )
    } else {
      this.isUnqiueEmail = true;
    }
  }

  uniquePhone() {
    if (this.validService.validatePhone(this.newEmpl.phone)) {
      this.newEmpl.phone = this.validService.phoneFormat(this.newEmpl.phone);
      this.emplService.checkUniquenessForPhone(this.newEmpl.phone).then(
        data => {
          this.isUniquePhone = data ? true : false;
        }
      )
    } else {
      this.isUniquePhone = true;
    }
  }

  createNewEmpl() {
    if (this.validateInput() && this.isUnqiueEmail && this.isUniquePhone) {
      this.newEmpl.firstName = this.validService.nameFormat(this.newEmpl.firstName);
      this.newEmpl.lastName = this.validService.nameFormat(this.newEmpl.lastName);
      this.newEmpl.isManager = 0;
      this.newEmpl.image = '';
      if (!this.newEmpl.managerId) {
        this.newEmpl.managerId = 0;
      }
      
      let pass = '';
      for (let i = 0; i < 8; i++) {
        pass += Math.floor(Math.random() * 10);
      }
      this.newEmpl.password = pass;

      this.submit = true;

      this.emplService.createEmployee(this.newEmpl).then(
        response => {
          if (response) {
            this.router.navigate(['employees/all']);
          } else {
            this.submit = false;
            this.fail = true;
          }
        }
      )
    }
  }

  hideFailMessage() {
    this.fail = false;
  }

}
