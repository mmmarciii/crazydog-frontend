import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCookieService } from '../../services/cookie.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.css']
})
export class CookieBannerComponent implements OnInit {
  showBanner = false;

  constructor(private cookieService: MyCookieService) {}

  ngOnInit(): void {
    this.showBanner = !this.cookieService.hasDecided();
  }

  accept(): void {
    this.cookieService.setConsent(true);
    this.showBanner = false;
  }
  reject(): void {
    this.cookieService.setConsent(false);
    this.showBanner = false;
  }
}