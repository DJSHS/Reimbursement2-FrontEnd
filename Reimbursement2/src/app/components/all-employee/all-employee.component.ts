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
  correspondDept: string[] = [];

  noEmplFound: boolean = false;

  constructor(private authService: AuthService, private emplService: EmployeeService, private router: Router, private deptService: DepartmentService) { }

  ngOnInit() {
    // if (!this.authService.empl) {
    //   this.router.navigate(["login"])
    // } else {
    //   this.getAllEmployees();
    // }
    this.getAllEmplsAndDepts();
  }

  getAllEmplsAndDepts() {
    this.deptService.getAllDepts().subscribe(
      data => {
        console.log(data);
        this.allDepts = data;
      }, error => {
        console.warn(error);
      }
    )

    this.emplService.getAllEmployees().subscribe(
      data => {
        this.allEmpls = data;
      }, error => {
        console.warn(error);
      }
    )
  }

  filterByDept(event) {
    console.log(event)
  }

  orderById() {

  }

  orderByDept() {
    
  }

  addEmpl() {
    this.router.navigate(['new/employee']);
  }

  hideMessage() {
    this.noEmplFound = false;
  }
}
