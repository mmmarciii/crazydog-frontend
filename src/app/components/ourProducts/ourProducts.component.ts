import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
    selector: 'app-ourProducts',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './ourProducts.component.html',
    styleUrl: './ourProducts.component.css'
})
export class OurProductsComponent {
  productItems: any[] = [];

  constructor(private productService: ProductService){}

  ngOnInit() {
    this.productItems = this.productService.getProducts();
  }
}
