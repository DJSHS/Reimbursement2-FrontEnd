import { Injectable } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url: string = environment.employeeUri;

  constructor(private http: HttpClient) { }

  getAllEmployees() {
		return this.http.get<Employee[]>(this.url);
  }

  getEmployeeById(idParm: number) {
    return this.http.get<Employee[]>(this.url+idParm);
  }
}
