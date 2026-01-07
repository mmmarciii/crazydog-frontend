import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class MyCookieService {
  private readonly COOKIE_NAME = 'user-consent';

  constructor(private cookieService: CookieService) {}

  setConsent(isSet: boolean): void {

    const value = isSet ? 'true' : 'false';

    this.cookieService.set(this.COOKIE_NAME, value, 365, '/');
  }

  hasConsent(): boolean {
    return this.cookieService.get(this.COOKIE_NAME) === 'true';
  }
}