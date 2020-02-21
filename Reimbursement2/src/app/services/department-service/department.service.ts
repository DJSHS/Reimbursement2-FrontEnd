import { Injectable } from '@angular/core';
import { Department } from 'src/app/models/department';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  url: string = environment.departmentUri;

  constructor(private http: HttpClient) { }

  getAllDepts() {
    return this.http.get<Department[]>(this.url);
  }

  getDeptById(idParm: number) {
    return this.http.get<Department>(this.url+idParm);
  }
}
