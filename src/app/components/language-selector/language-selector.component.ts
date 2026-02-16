import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: 'language-selector.component.html',
  styleUrl: 'language-selector.component.css'
})
export class LanguageSelectorComponent {
  private translate = inject(TranslateService);
  /*currentLang = localStorage.getItem('lang') || 'de';*/
  currentLang = 'de';

  ngOnInit() {    
    this.translate.setDefaultLang('de');
    this.translate.use('de').subscribe();
  }

  changeLang(lang: string) {
    this.currentLang = lang;

    this.translate.use(lang).subscribe();
    
    localStorage.setItem('lang', lang);
  }
}