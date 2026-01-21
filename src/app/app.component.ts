import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crazydog-frontend';

  private translate = inject(TranslateService);

  constructor() {
    this.translate.setFallbackLang('en');
    const savedLang = localStorage.getItem('lang');
    const browserLang = this.translate.getBrowserLang();
    const finalLang = savedLang || (browserLang?.match(/hu|en|de/) ? browserLang : 'en');
    this.translate.use(finalLang);
  }
}