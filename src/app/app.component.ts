import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { HeroComponent } from "./components/hero/hero.component";
import { OurProductsComponent } from "./components/ourProducts/ourProducts.component";
import { FooterComponent } from "./components/footer/footer.component";
import { OrderProcessComponent } from './components/orderProcess/orderProcess.component';
import { OrderComponent } from './components/order/order.component';
import { FaqComponent } from './components/faq/faq.component';
import { InstaFeedComponent } from './components/insta-feed/insta-feed.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        /*RouterOutlet,*/
        HeaderComponent,
        HeroComponent,
        OurProductsComponent,
        OrderProcessComponent,
        OrderComponent,
        FaqComponent,
        /*InstaFeedComponent,*/
        ContactComponent,
        FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crazydog-frontend';
}
