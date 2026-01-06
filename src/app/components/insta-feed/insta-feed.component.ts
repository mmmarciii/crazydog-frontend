import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-insta-feed',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './insta-feed.component.html',
    styleUrl: './insta-feed.component.css'
})
export class InstaFeedComponent {
  instaItems = [
    { id: '1', link: 'images/products/labubu-v1.jpg'},
    { id: '1', link: 'images/products/star-wars-v3-1-1.jpg'},
    { id: '1', link: 'images/products/leopard-1-1.jpg'},
  ];
}
