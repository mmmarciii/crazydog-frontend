import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-hero',
    standalone: true,
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.css'
})
export class HeroComponent {
offsetY = 0;
  opacity = 1;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scroll = window.scrollY;
    
    this.offsetY = scroll * 0.8; 
    
    this.opacity = 1 - (scroll / 500);
    
    if (this.opacity < 0) this.opacity = 0;
  }
}
