import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteFormService {
  private readonly apiUrl = 'https://crazydogcustom.com/dev/quoteform.php';

  constructor(private http: HttpClient) { }
  
  sendQuote(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}
