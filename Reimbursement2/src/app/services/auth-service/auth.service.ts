import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../../models/employee';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  url: string = environment.loginUri;
  empl: any = null;

  login(employee: Employee) {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    
    return this.http.post(this.url, employee, httpOption).toPromise();
	}
}
