import { ProductImagePipe } from '@/product/pipes/product-image.pipe';
import { Component, input } from '@angular/core';

@Component({
  selector: 'product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.component.html',
})
export class ProductCarouselComponent { 
  productImages = input.required<string[]>();
}