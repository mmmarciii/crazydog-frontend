import { TestBed } from '@angular/core/testing';

import { MyCookieService } from './cookie.service';

describe('CookieService', () => {
  let service: MyCookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyCookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
