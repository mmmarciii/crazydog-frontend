import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteFormService {
  private url = 'https://crazydogcustom.com/dev/quoteform.php';

  constructor(private http: HttpClient) { }
  
  sendEmail(data: any): Observable<any> {
    return this.http.post(this.url, data);
  }
}
