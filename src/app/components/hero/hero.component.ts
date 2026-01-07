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

    // help to recalculate when window resized
    let mm = gsap.matchMedia();

     
    mm.add({
          isDesktop: "(min-width: 1041px)",
          isMobile: "(max-width: 1040px)"
        }, (context) => {
          // Itt kinyerjük, hogy épp mobil-e a nézet (ha szükséged lenne rá a logikában)
          let { isMobile } = context.conditions as any;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top top",
              // Mobilabb nézeten rövidebb görgetést is megadhatsz, ha akarod
              end: isMobile ? "+=1500" : "+=2000",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true // Fontos a reszponzivitáshoz!
        }
    });

    tl.from(".flying-item.swoosh", { x: "-200vw", y: "-200vh", rotation: -360, duration: 0.8 }, 0)
      .from(".flying-item.upper", { x: "200vw", y: "-200vh", rotation: 360, duration: 1 }, 0.1)
      .from(".flying-item.laces", { x: "-200vw", y: "200vh", rotation: 180, duration: 1.2 }, 0.2)
      .from(".flying-item.midsole", { x: "200vw", y: "200vh", rotation: -180, duration: 1.4 }, 0.3)
      .from(".flying-item.heelportion", { x: "100vw", y: "100vh", rotation: -270, duration: 1 }, 0.4)
      .from(".flying-item.heel-tab", { x: "-100vw", y: "-100vh", rotation: 270, duration: 0.6 }, 0.5)
      .from(".flying-item.middle", { x: "100vw", y: "-100vh", rotation: -360, duration: 1.4}, 0.6)
      .from(".flying-item.outer-toe", { x: "-100vw", y: "100vh", rotation: 360, duration: 1 }, 0.7)
      .from(".flying-item.sock-liner", { x: "150vw", y: "150vh", rotation: -180, duration: 1.2 }, 0.8)
      .from(".flying-item.tongue", { x: "-150vw", y: "-150vh", rotation: 180, duration: 1.4 }, 0.9)
      .from(".flying-item.upper2", { x: "150vw", y: "-150vh", rotation: -270, duration: 1.6 }, 1)

    tl.set(".flying-item, .center-piece-main", { display: "none" }, "+=0.5")
      .set(".center-piece-painted", { display: "block" })

      .to(".center-piece-painted", { scale: 1.2, duration: 0.8, ease: "back.out(2)"})
      .to(".center-piece-painted", { scale: 1, duration: 0.5 });
    
    
      return () => {
        
      };
    });
  }
}