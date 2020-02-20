import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Employee } from 'src/app/models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  empl: Employee = new Employee();
  failed: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.empl).then(response => {
      this.authService.empl = response;
      if (this.authService.empl !== null) {
        this.router.navigate(['home']);
      } else {
        this.failed = true;
        this.empl.password = '';
      }
    }, error => {
      console.warn(error);
    })
  }

  hideMessage() {
    this.failed = false;
  }
}
