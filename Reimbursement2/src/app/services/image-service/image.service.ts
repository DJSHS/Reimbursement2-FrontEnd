import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  url: string = environment.imageUri;

  constructor(private http: HttpClient) { }

  uploadImageForReim(image: File) {
    return this.http.post(this.url+'receipts', image).toPromise();
  }

  uploadImageForEmpl(image: File) {
    return this.http.post(this.url+'images', image).toPromise();
  }
}
