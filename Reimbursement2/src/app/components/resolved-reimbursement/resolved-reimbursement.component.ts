import { Component, OnInit } from '@angular/core';
import { ReimbursementService } from 'src/app/services/reimbursement-service/reimbursement.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Reimbursement } from 'src/app/models/reimbursement';

@Component({
  selector: 'app-resolved-reimbursement',
  templateUrl: './resolved-reimbursement.component.html',
  styleUrls: ['./resolved-reimbursement.component.css']
})
export class ResolvedReimbursementComponent implements OnInit {

  resolvedReims: Reimbursement[] = [];

  constructor(private reimService: ReimbursementService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (!this.authService.empl) {
      this.router.navigate(['login']);
    } else {
      this.getAllResolvedReims();
    }
  }

  getAllResolvedReims() {
    this.reimService.getResolvedReimbursementsByEmplId(this.authService.empl.emplId).subscribe(
      data => {
        this.resolvedReims = data;
    }, error => {
      console.warn(error);
    })
  }

}
