import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.empl = null;
    this.router.navigate(['login']);
  }

}
