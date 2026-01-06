import { Component } from '@angular/core';


@Component({
    selector: 'app-features',
    standalone: true,
    imports: [],
    templateUrl: './features.component.html',
    styleUrl: './features.component.css'
})
export class FeaturesComponent {
  productItems = [
    { name: 'product1', link: 'images/products/star-wars-v6-5-4.jpg', desc: 'Some quick example text to build on the card title and make up the bulk of the cards content.'},
    { name: 'product2', link: 'images/products/star-wars-v6-5-4.jpg', desc: 'Some quick example text to build on the card title and make up the bulk of the cards content.'},
    { name: 'product3', link: 'images/products/star-wars-v6-5-4.jpg', desc: 'Some quick example text to build on the card title and make up the bulk of the cards content.'},
  ];
}
