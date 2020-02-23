import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { EmployeeService } from 'src/app/services/employee-service/employee.service';
import { DepartmentService } from 'src/app/services/department-service/department.service';
import { Employee } from 'src/app/models/employee';
import { Department } from 'src/app/models/department';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  currentEmpl: Employee = new Employee();
  currentDept: Department = new Department();

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private emplService: EmployeeService, private deptService: DepartmentService) { }

  ngOnInit() {
    if (!this.authService.empl ) {
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
    if (window.confirm('Delete the employee?')) {
      this.emplService.deleteEmployee(this.currentEmpl.emplId).then(
        data => {
          if (!data) {
            this.router.navigate(['employees/all']);
          }
        }
      )
    }
  }

}
