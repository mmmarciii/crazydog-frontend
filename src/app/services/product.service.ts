import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = [
    { name: 'Basic', link: 'images/products/basic.jpg', desc: 'Some quick example text...' },
    { name: 'Pro', link: 'images/products/labubu-v4-5-4.jpg', desc: 'Detailed design...' },
    { name: 'Elit', link: 'images/products/star-wars-v6-5-4.jpg', desc: 'Premium quality...' },
  ];

  getProducts() {
    return this.products;
  }
}