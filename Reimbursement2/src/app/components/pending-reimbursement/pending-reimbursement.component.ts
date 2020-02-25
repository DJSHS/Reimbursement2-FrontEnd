import { Component, OnInit } from '@angular/core';
import { ReimbursementService } from 'src/app/services/reimbursement-service/reimbursement.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Reimbursement } from 'src/app/models/reimbursement';

@Component({
  selector: 'app-pending-reimbursement',
  templateUrl: './pending-reimbursement.component.html',
  styleUrls: ['./pending-reimbursement.component.css']
})
export class PendingReimbursementComponent implements OnInit {

  pendingReims: Reimbursement[] = [];

  constructor(private reimService: ReimbursementService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (!this.authService.empl) {
      this.router.navigate(['login']);
    } else {
      this.getAllPendingReims();
    }
  }

  getAllPendingReims() {
    this.reimService.getPendingReimbursementsByEmplId(this.authService.empl.emplId).subscribe(
      data => {
        this.pendingReims = data.sort((a, b) => a.reimId > b.reimId ? 1 : -1);
    }, error => {
      console.warn(error);
    })
  }
}
