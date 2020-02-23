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
    return this.http.get<Employee>(this.url+idParm);
  }

  createEmployee(empl: Employee) {
    return this.http.post(this.url, empl).toPromise();
  }

  updateEmployee(empl: Employee) {
    return this.http.put(this.url+empl.emplId, empl).toPromise();
  }

  deleteEmployee(idParm: number) {
    return this.http.delete(this.url+idParm).toPromise();
  }

  checkUniquenessForEmail(email: string) {
    let empl = new Employee();
    empl.email = email;
    return this.http.post(this.url+'email', empl).toPromise();
  }

  checkUniquenessForPhone(phone: string) {
    let empl = new Employee();
    empl.phone = phone;
    return this.http.post(this.url+'phone', empl).toPromise();
  }
}
