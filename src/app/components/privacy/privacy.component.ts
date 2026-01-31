import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet, RouterModule } from "@angular/router";
import { CookieBannerComponent } from "../cookie-banner/cookie-banner.component";
import { TranslateModule } from '@ngx-translate/core';  

@Component({
  selector: 'app-privacy',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    RouterModule,
    CookieBannerComponent,
    TranslateModule
  ],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.css',
})
export class PrivacyComponent {

}
