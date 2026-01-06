import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuItems = [
      { name: 'Home', link: '#home' },
      { name: 'Products', link: '#products' },
      { name: 'How we work', link: '#howwework' },
      { name: 'FAQ', link: '#faq' },
      { name: 'Contact us', link: '#contactus' }
  ];

  activeItem: string = 'Home';

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
