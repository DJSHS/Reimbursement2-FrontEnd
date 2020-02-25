import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Employee } from 'src/app/models/employee';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department-service/department.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: Employee;
  myManager: Employee;
  myDept: Department;

  managerName: string = '';
  newPass: string = '';
  confirmPass: string = '';

  originalProfile: Employee;

  editable: string = '';
  isUnqiueEmail: boolean = true;
  isUniquePhone: boolean = true;
  changed: boolean = false;
  success: boolean = false;

  constructor(private router: Router, private authService: AuthService, private emplService: EmployeeService, private deptService: DepartmentService, private validService: ValidationService) { }

  ngOnInit() {
    if (!this.authService.empl) {
      this.router.navigate(['login']);
    } else {
      this.getMyProfile();
    }
  }

  getMyProfile() {
    this.emplService.getEmployeeById(this.authService.empl.emplId).subscribe(
      data => {
        this.profile = data;
        this.originalProfile = Object.assign({}, this.profile);

        this.getMyManager();
        this.getMyDepartment();
      }, error => {
        console.warn(error);
      }
    )
  }

  getMyManager() {
    if (this.profile.managerId) {
      this.emplService.getEmployeeById(this.profile.managerId).subscribe(
        data => {
          this.myManager = data;
          this.managerName = `${this.myManager.firstName} ${this.myManager.lastName}`;
        }, error => {
          console.warn(error);
        }
      )
    }
  }

  getMyDepartment() {
    this.deptService.getDeptById(this.profile.deptId).subscribe(
      data => {
        this.myDept = data;
      }, error => {
        console.warn(error);
      }
    )
  }

  edit(attribute) {
    if (this.editable === attribute) {
      this.editable = '';
    } else {
      this.editable = attribute;
    }
  }

  updateProfile() {
    if ((!this.newPass || (this.newPass === this.confirmPass && this.validService.validatePassword(this.newPass))) && this.validService.validateEmail(this.profile.email) && this.validService.validatePhone(this.profile.phone) && this.isUniquePhone && this.isUnqiueEmail) {

      this.profile.password = this.newPass ? this.newPass : this.profile.password;
      this.profile.phone = this.validService.phoneFormat(this.profile.phone);
      this.editable = '';
      this.changed = false;

      this.emplService.updateEmployee(this.profile).then(
        data => {
          if (!data) {
            this.newPass = '';
            this.confirmPass = '';
            this.getMyProfile();
            this.success = true;
            setTimeout(() => this.success = false, 5000);
          }
        }
      )
    }
  }

  restore() { 
    this.editable = '';
    this.changed = false;
    this.newPass = '';
    this.confirmPass = '';
    this.profile.email = this.originalProfile.email;
    this.profile.phone = this.originalProfile.phone;
    this.profile.password = this.originalProfile.password;
  }

  uniqueEmail(event) {
    this.changed = true;
    if (event !== this.originalProfile.email) {
      if (this.validService.validateEmail(event)) {
        this.emplService.checkUniquenessForEmail(event).then(
          data => {
            this.isUnqiueEmail = data ? true : false;
          }
        )
      } else {
        this.isUnqiueEmail = true;
      }
    }
  }

  uniquePhone(event) {
    this.changed = true;
    if (event !== this.originalProfile.phone) {
      if (this.validService.validatePhone(event)) {
        event = this.validService.phoneFormat(event);
        this.emplService.checkUniquenessForPhone(event).then(
          data => {
            this.isUniquePhone = data ? true : false;
          }
        )
      } else {
        this.isUniquePhone = true;
      }
    }
  }

}
