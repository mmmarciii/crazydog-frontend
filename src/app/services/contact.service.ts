import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url = 'https://crazydogcustom.com/dev/mail.php';

  constructor(private http: HttpClient) { }
  
  sendEmail(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }
}
