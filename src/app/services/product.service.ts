import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = [
    { 
      name: 'Basic', 
      link: 'images/products/basic.jpg', 
      desc: 'The perfect choice if you want a clean yet personalized design that’s easy to match with any outfit.',
      colors: 'Maximum 2 colors',
      areas: 'Small, targeted painted areas (approx. 10–20% of the shoe)',
      patterns: 'Simple patterns and shapes',
      desing: 'Short text, letters, numbers, or monograms'
    },
    { 
      name: 'Pro', 
      link: 'images/products/labubu-v4-5-4.jpg', 
      desc: 'For those who want a bold, eye-catching, and expressive design that stands out from a distance.',
      colors: 'Maximum 4 colors',
      areas: 'Medium-sized painted areas (approx. 20–50% of the shoe)',
      patterns: 'More complex patterns and graphic elements',
      desing: 'Text, names, numbers, slogans'
    }, 
    { name: 'Elit', 
      link: 'images/products/star-wars-v6-5-4.jpg', 
      desc: 'Made for those who don’t just want a pair of shoes - but a wearable work of art that truly represents them.',
      colors: 'No color limit',
      areas: 'Full-coverage or large-scale paintings',
      patterns: 'Highly detailed, artistic graphics',
      desing: 'Custom illustrations, logos, portraits, and complex patterns'
    },
  ];

  getProducts() {
    return this.products;
  }
}