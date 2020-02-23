import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Reimbursement } from 'src/app/models/reimbursement';

@Injectable({
  providedIn: 'root'
})
export class ReimbursementService {

  url: string = environment.reimbursementUri;

  constructor(private http: HttpClient) { }

  getAllReimbursements() {
		return this.http.get<Reimbursement[]>(this.url);
  }

  getAllPendingReimbursement() {
    return this.http.get<Reimbursement[]>(this.url+'pending');
  }

  getAllResolvedReimbursement() {
    return this.http.get<Reimbursement[]>(this.url+'resolved');
  }

  getReimbursementById(idParm: number) {
    return this.http.get<Reimbursement>(this.url+idParm);
  }
  
  getAllReimbursementsByEmplId(idParm: number) {
		return this.http.get<Reimbursement[]>(this.url+'employees/'+idParm);
  }
  
  getPendingReimbursementsByEmplId(idParm: number) {
		return this.http.get<Reimbursement[]>(this.url+'employees/'+idParm+'/pending');
  }
  
  getResolvedReimbursementsByEmplId(idParm: number) {
		return this.http.get<Reimbursement[]>(this.url+'employees/'+idParm+'/resolved');
  }
  
  createReimbursement(reim: Reimbursement) {
    return this.http.post(this.url, reim).toPromise();
  }

  updateReimbursement(reim: Reimbursement) {
    return this.http.put(this.url+reim.reimId, reim).toPromise();
  }

  deleteReimbursement(idParm: number) {
    return this.http.delete(this.url+idParm).toPromise();
  }
}
