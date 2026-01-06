import { Component, ElementRef, viewChild, afterNextRender } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  private readonly heroContainer = viewChild<ElementRef<HTMLElement>>('heroContainer');
  private readonly centerElement = viewChild<ElementRef<HTMLElement>>('centerElement');

  constructor() {
    afterNextRender(() => {
      this.createFlyingAnimation();
    });
  }

  private createFlyingAnimation() {
    const container = this.heroContainer()?.nativeElement;
    const center = this.centerElement()?.nativeElement;
    
    if (!container || !center) return;

    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",      
        end: "+=3000",        
        scrub: 1,             
        pin: true,           
        anticipatePin: 1
      }
    });

    tl.from(".flying-item.top-left", { x: "-200vw", y: "-200vh", rotation: -360, duration: 0.8 }, 0).to(".flying-item.top-left", { x: -182, y: -6, opacity: 1 })
      .from(".flying-item.top-right", { x: "200vw", y: "-200vh", rotation: 360, duration: 1 }, 0.4).to(".flying-item.top-right", { x: -200.2196, y: -68.7804, opacity: 1 })
      .from(".flying-item.bottom-left", { x: "-200vw", y: "200vh", rotation: 180, duration: 1.2 }, 0.6).to(".flying-item.bottom-left", { x: -62, y: 6, opacity: 1 })
      .from(".flying-item.bottom-right", { x: "200vw", y: "200vh", rotation: -180, duration: 1.4 }, 0.8).to(".flying-item.bottom-right", { x: 251.5499, y: 28.5499, opacity: 1 })
      
    tl.set(".flying-item, .center-piece-main", { display: "none" }, "+=0.5")
      .set(".center-piece-painted", { display: "block" })

      .to(".center-piece-painted", { scale: 1.2, duration: 0.8, ease: "back.out(2)"})
      .to(".center-piece-painted", { scale: 1, duration: 0.5 });
  }
}