import { Component } from '@angular/core';
import { LanguageSelectorComponent } from '../language-selector/language-selector.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [LanguageSelectorComponent, TranslateModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuItems = [
      { name: 'NAV.HOME', link: '#hero' },
      { name: 'NAV.OURPRODUCTS', link: '#products' },
      { name: 'NAV.ORDER', link: '#order' },
      { name: 'NAV.FAQ', link: '#faq' },
      { name: 'NAV.CONTACTUS', link: '#contactus' }
  ];

  activeItem: string = 'NAV.HOME';

  collapseMenu(menuElement: HTMLElement, itemName: string) {
    this.activeItem = itemName;
    if (menuElement.classList.contains('show')) {
      const bootstrap = (window as any).bootstrap;
      if (bootstrap) {
        const bsCollapse = new bootstrap.Collapse(menuElement);
        bsCollapse.hide();
      }
    }
  }

}
