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
  displayEmpls: Employee[] = [];

  allDepts: Department[] = [];

  searchName: string = '';

  orderEmplId: boolean = false;
  orderDeptName: boolean = false;
  noEmplFound: boolean = false;

  currentPage: number = 1;
  totalPage: number = 1;

  constructor(private authService: AuthService, private emplService: EmployeeService, private router: Router, private deptService: DepartmentService) { }

  ngOnInit() {
    if (!this.authService.empl || !this.authService.empl.isManager) {
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
        this.displayEmpls = this.empls.slice(0, 8);
        this.totalPage = Math.ceil(this.empls.length / 8);
      }, error => {
        console.warn(error);
      }
    )
  }

  searchEmpl() {
    this.empls = this.allEmpls.filter(e => `${e.firstName} ${e.lastName}`.toLowerCase().includes(this.searchName.toLowerCase()));
    this.displayEmpls = this.empls.slice(0, 8);
    this.totalPage = Math.ceil(this.empls.length / 8);
    this.currentPage = 1;
  }

  filterByDept(event) {
    this.empls = this.allEmpls.filter(e => e.deptId == event.target.value);
    this.displayEmpls = this.empls.slice(0, 8);
    this.totalPage = Math.ceil(this.empls.length / 8);
    this.currentPage = 1;
  }

  orderById() {
    if (!this.orderEmplId) {
      this.displayEmpls = this.empls.sort((a, b) => a.emplId > b.emplId ? -1 : 1).slice(this.currentPage * 8 - 8, this.currentPage * 8);
    } else {
      this.displayEmpls = this.empls.sort((a, b) => a.emplId > b.emplId ? 1 : -1).slice(this.currentPage * 8 - 8, this.currentPage * 8);
    }
    this.orderEmplId = !this.orderEmplId;
  }

  orderByDept() {
    if (!this.orderDeptName) {
      this.displayEmpls = this.empls.sort((a, b) => a.deptId > b.deptId ? -1 : 1).slice(this.currentPage * 8 - 8, this.currentPage * 8);
    } else {
      this.displayEmpls = this.empls.sort((a, b) => a.deptId > b.deptId ? 1 : -1).slice(this.currentPage * 8 - 8, this.currentPage * 8);
    }
    this.orderDeptName = !this.orderDeptName;
  }

  showAllEmpls() {
    if (this.empls.length < this.allEmpls.length) {
      this.searchName = '';
      this.empls = this.allEmpls;
      this.displayEmpls = this.empls.slice(0, 8);
      this.totalPage = Math.ceil(this.empls.length / 8);
      this.currentPage = 1;
    }
  }

  nextPage() {
    this.currentPage++;
    this.displayEmpls = this.empls.slice(this.currentPage * 8 - 8, this.currentPage * 8);
  }

  prevPage() {
    this.currentPage--;
    this.displayEmpls = this.empls.slice(this.currentPage * 8 - 8, this.currentPage * 8);
  }
}
