import { ProductCardComponent } from '@/product/components/product-card/product-card.component';
import { ProductService } from '@/product/services/products.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private readonly productService = inject(ProductService);
  
  productsResource = rxResource({
    params: () => ({}),
    stream: ({ params }) => {
      return this.productService.getProducts({})
    }
  })
 }
