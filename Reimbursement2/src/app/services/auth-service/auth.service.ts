import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../../models/employee';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private url: string = environment.loginUri;
  public empl: any = null;

  login(employee: Employee) {
    let httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };

    // this.http.post(this.url, employee, httpOption).subscribe(
		// 	(response) => {
    //     console.log(response)
    //     this.empl = response;
    //     this.router.navigate(['home']);
		// 	},
		// 	(error) => {
    //     console.warn(error);
    //     return false;
		// 	}
    // );


  //   const httpOption = {
  //     headers: new HttpHeaders({
  //         'Access-Control-Allow-Origin': 'http://localhost:4200',
  //         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
  //         'Access-Control-Allow-Headers': '*',
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json'
  //     })
  // };
    
    return this.http.post(this.url, employee, httpOption).toPromise();
	}
}
