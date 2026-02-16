import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = [
    { 
      name: 'OURPRODUCTS.PROD1', 
      link: 'images/products/basic.jpg',
      value: 'Basic', 
      desc: 'OURPRODUCTS.PROD1_DESC',
      colors: 'OURPRODUCTS.PROD1_DET_1',
      areas: 'OURPRODUCTS.PROD1_DET_2',
      patterns: 'OURPRODUCTS.PROD1_DET_3',
      desing: 'OURPRODUCTS.PROD1_DET_4',
      price: '90'
    },
    { 
      name: 'OURPRODUCTS.PROD2',
      value: 'Pro', 
      link: 'images/products/labubu-v4-5-4.jpg', 
      desc: 'OURPRODUCTS.PROD2_DESC',
      colors: 'OURPRODUCTS.PROD2_DET_1',
      areas: 'OURPRODUCTS.PROD2_DET_2',
      patterns: 'OURPRODUCTS.PROD2_DET_3',
      desing: 'OURPRODUCTS.PROD2_DET_4',
      price: '144'
    }, 
    { name: 'OURPRODUCTS.PROD3',
      value: 'Elite', 
      link: 'images/products/star-wars-v6-5-4.jpg', 
      desc: 'OURPRODUCTS.PROD3_DESC',
      colors: 'OURPRODUCTS.PROD3_DET_1',
      areas: 'OURPRODUCTS.PROD3_DET_2',
      patterns: 'OURPRODUCTS.PROD3_DET_3',
      desing: 'OURPRODUCTS.PROD3_DET_4',
      price: '224'
    },
  ];

  getProducts() {
    return this.products;
  }
}