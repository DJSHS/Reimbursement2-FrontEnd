import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ReimbursementService } from 'src/app/services/reimbursement-service/reimbursement.service';
import { Reimbursement } from 'src/app/models/reimbursement';

@Component({
  selector: 'app-new-reimbursement',
  templateUrl: './new-reimbursement.component.html',
  styleUrls: ['./new-reimbursement.component.css']
})
export class NewReimbursementComponent implements OnInit {

  newReim: Reimbursement = new Reimbursement();
  selectedImg: File;

  success: boolean = false;
  fail: boolean = false;
  submited: boolean = false;

  constructor(private router: Router, private authService: AuthService, private reimService: ReimbursementService) { }

  ngOnInit() {
    if (!this.authService.empl) {
      this.router.navigate(['login']);
    }
  }

  submitReimRequest() {
    this.newReim.amount = Math.floor(this.newReim.amount * 100) / 100;
    this.newReim.status = 'pending';
    this.newReim.submitById = this.authService.empl.emplId;
    this.newReim.submitDate = new Date().toISOString().slice(0, 10);
    this.newReim.resolvedById = 0;
    this.newReim.receipt = '';

    this.reimService.createReimbursement(this.newReim).then(
      response => {
        if (response) {
          this.submited = true;
          this.success = true;
          setTimeout(() => this.success = false, 3000);
        } else {
          this.fail = true;
          setTimeout(() => this.fail = false, 3000);
        }
      }
    )
  }

  upload(event) {
    if (event.target.files.length) {
      this.selectedImg = event.target.files[0]
      this.newReim.receipt = this.selectedImg.name;
    }
  }

}
