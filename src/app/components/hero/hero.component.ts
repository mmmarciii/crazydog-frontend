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

    tl.from(".flying-item.swoosh", { x: "-200vw", y: "-200vh", rotation: -360, duration: 0.2 }, 0).to(".flying-item.swoosh", { x: -182, y: -6, opacity: 1 })
      .from(".flying-item.upper", { x: "200vw", y: "-200vh", rotation: 360, duration: 1 }, 0).to(".flying-item.upper", { x: -200.2196, y: -68.7804, opacity: 1 })
      .from(".flying-item.laces", { x: "-200vw", y: "200vh", rotation: 180, duration: 1.2 }, 0).to(".flying-item.laces", { x: 63, y: -70, opacity: 1 })
      .from(".flying-item.midsole", { x: "200vw", y: "200vh", rotation: -180, duration: 1.4 }, 0).to(".flying-item.midsole", { x: -0.45, y: 124.55, opacity: 1 })

      .from(".flying-item.heelportion", { x: "100vw", y: "100vh", rotation: -270, duration: 0.4 }, 0).to(".flying-item.heelportion", { x: -291.45, y: 16.55, opacity: 1 })
      .from(".flying-item.heel-tab", { x: "-100vw", y: "-100vh", rotation: 270, duration: 0.6 }, 0).to(".flying-item.heel-tab", { x: -364.45, y: -80.45, opacity: 1 })
      .from(".flying-item.middle", { x: "100vw", y: "-100vh", rotation: -360, duration: 0.8}, 0).to(".flying-item.middle", { x: -0.45, y: 158.55, opacity: 1 })
      .from(".flying-item.outer-toe", { x: "-100vw", y: "100vh", rotation: 360, duration: 1 }, 0).to(".flying-item.outer-toe", { x: 189.55, y: 54.55, opacity: 1 })
      .from(".flying-item.sock-liner", { x: "150vw", y: "150vh", rotation: -180, duration: 1.2 }, 0).to(".flying-item.sock-liner", { x: -210.45, y: -114.45, opacity: 1 })
      .from(".flying-item.tongue", { x: "-150vw", y: "-150vh", rotation: 180, duration: 1.4 }, 0).to(".flying-item.tongue", { x: -83.45, y: -166.45, opacity: 1 })
      .from(".flying-item.upper2", { x: "150vw", y: "-150vh", rotation: -270, duration: 1.6 }, 0).to(".flying-item.upper2", { x: 41.8, y: -71.6, opacity: 1 })
      




    tl.set(".flying-item, .center-piece-main", { display: "none" }, "+=0.5")
      .set(".center-piece-painted", { display: "block" })

      .to(".center-piece-painted", { scale: 1.2, duration: 0.8, ease: "back.out(2)"})
      .to(".center-piece-painted", { scale: 1, duration: 0.5 });
  }
}