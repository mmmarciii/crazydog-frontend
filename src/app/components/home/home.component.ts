import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { HeroComponent } from "../hero/hero.component";
import { OurProductsComponent } from "../ourProducts/ourProducts.component";
import { FooterComponent } from "../footer/footer.component";
import { OrderProcessComponent } from '../orderProcess/orderProcess.component';
import { OrderComponent } from '../order/order.component';
import { FaqComponent } from '../faq/faq.component';
import { InstaFeedComponent } from '../insta-feed/insta-feed.component';
import { ContactComponent } from '../contact/contact.component';
import { CookieBannerComponent } from '../cookie-banner/cookie-banner.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        HeaderComponent,
        HeroComponent,
        OurProductsComponent,
        OrderProcessComponent,
        OrderComponent,
        FaqComponent,
        /*InstaFeedComponent,*/
        ContactComponent,
        FooterComponent,
        /*CookieBannerComponent*/
      ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'crazydog-frontend';
}
