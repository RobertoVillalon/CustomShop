import { ProductService } from '@/product/services/products.service';
import { Component, inject, input, Input, OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductImagePipe } from '@/product/pipes/product-image.pipe';
import { ProductCarouselComponent } from "@/product/components/product-carousel/product-carousel.component";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent{ 
  private readonly productService = inject(ProductService);
  productId: string = inject(ActivatedRoute).snapshot.params['id'];

  productsResource = rxResource({
    params: () => ({id: this.productId}),
    stream: ({ params }) => {
      return this.productService.getProduct(params.id);
    }
  })
}