import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from "@angular/router";
import { CookieBannerComponent } from "../cookie-banner/cookie-banner.component";

@Component({
  selector: 'app-imprint',
  imports: [
    HeaderComponent, 
    FooterComponent, 
    RouterOutlet, 
    CookieBannerComponent
  ],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.css',
})
export class ImprintComponent {

}
