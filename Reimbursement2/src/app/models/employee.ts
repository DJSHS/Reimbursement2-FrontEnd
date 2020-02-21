import { Department } from './department';

export class Employee {
    emplId: number;
    firstName: string ;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    image: string;
    managerId: number;
    isManager: number;
    deptId: number;
    position: string;
    department: Department = new Department();
};