import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class MyCookieService {
  private readonly CONSENT_KEY = 'user-consent-decision'; 
  private readonly HAS_DECIDED_KEY = 'user-has-decided';

  constructor(private cookieService: CookieService) {}

setConsent(isSet: boolean): void {
    const expireDays = 180;
   
    this.cookieService.set(this.CONSENT_KEY, isSet ? 'true' : 'false', expireDays, '/');
    
    this.cookieService.set(this.HAS_DECIDED_KEY, 'true', expireDays, '/');
  }

  hasDecided(): boolean {
    return this.cookieService.check(this.HAS_DECIDED_KEY);
  }

  isFullConsent(): boolean {
    return this.cookieService.get(this.CONSENT_KEY) === 'true';
  }
}