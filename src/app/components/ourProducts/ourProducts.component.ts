import { Component } from '@angular/core';


@Component({
    selector: 'app-ourProducts',
    standalone: true,
    imports: [],
    templateUrl: './ourProducts.component.html',
    styleUrl: './ourProducts.component.css'
})
export class OurProductsComponent {
  productItems = [
    { name: 'Basic', link: 'images/products/basic.jpg', desc: 'Some quick example text to build on the card title and make up the bulk of the cards content.'},
    { name: 'Pro', link: 'images/products/labubu-v4-5-4.jpg', desc: 'Some quick example text to build on the card title and make up the bulk of the cards content.'},
    { name: 'Elit', link: 'images/products/star-wars-v6-5-4.jpg', desc: 'Some quick example text to build on the card title and make up the bulk of the cards content.'},
  ];
}
