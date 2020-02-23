import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateName(name: string) {
		return /^([a-zA-z]){1,20}$/.test(name) && name.length < 30;
	}

  validateEmail(email: string) {
		return /^\w+\.?\w+@\w+\.\w{2,4}$/.test(email);
  }
  
  validatePhone(phone: string) {
		return /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(phone);
  }

  nameFormat(name: string) {
		return name[0].toUpperCase() + name.slice(1).toLowerCase();
  }
  
  phoneFormat(phone: string) {
		return phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
	}
}
