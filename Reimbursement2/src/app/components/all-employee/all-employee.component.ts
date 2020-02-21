import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { Employee } from 'src/app/models/employee';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/services/department-service/department.service';
import { Department } from 'src/app/models/department';

@Component({
  selector: 'app-all-employee',
  templateUrl: './all-employee.component.html',
  styleUrls: ['./all-employee.component.css']
})
export class AllEmployeeComponent implements OnInit {

  allEmpls: Employee[] = [];
  empls: Employee[] = [];

  allDepts: Department[] = [];

  searchName: string = '';

  orderEmplId: boolean = false;
  orderDeptName: boolean = false;
  noEmplFound: boolean = false;

  constructor(private authService: AuthService, private emplService: EmployeeService, private router: Router, private deptService: DepartmentService) { }

  ngOnInit() {
    if (!this.authService.empl) {
      this.router.navigate(["login"])
    } else {
      this.getAllEmplsAndDepts();
    }
  }

  getAllEmplsAndDepts() {
    this.deptService.getAllDepts().subscribe(
      data => {
        this.allDepts = data.sort((a, b) => a.deptId - b.deptId);
      }, error => {
        console.warn(error);
      }
    )

    this.emplService.getAllEmployees().subscribe(
      data => {
        this.allEmpls = data.sort((a, b) => b.isManager - a.isManager);
        this.empls = this.allEmpls;

      }, error => {
        console.warn(error);
      }
    )
  }

  searchEmpl() {
    this.empls = this.allEmpls.filter(e => `${e.firstName} ${e.lastName}`.toLowerCase().includes(this.searchName.toLowerCase()));
  }

  filterByDept(event) {
    this.empls = this.allEmpls.filter(e => e.deptId == event.target.value);
  }

  orderById() {
    if (!this.orderEmplId) {
      this.empls.sort((a, b) => a.emplId > b.emplId ? -1 : 1);
    } else {
      this.empls.sort((a, b) => a.emplId > b.emplId ? 1 : -1);
    }
    this.orderEmplId = !this.orderEmplId;
  }

  orderByDept() {
    if (!this.orderDeptName) {
      this.empls.sort((a, b) => a.deptId > b.deptId ? -1 : 1);
    } else {
      this.empls.sort((a, b) => a.deptId > b.deptId ? 1 : -1);
    }
    this.orderDeptName = !this.orderDeptName;
  }

  showAllEmpls() {
    if (this.empls.length < this.allEmpls.length) {
      this.searchName = '';
      this.empls = this.allEmpls;
    }
  }
}
