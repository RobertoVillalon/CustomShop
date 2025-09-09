import { ProductCardComponent } from '@/product/components/product-card/product-card.component';
import { ProductService } from '@/product/services/products.service';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponent } from "@/shared/components/pagination/pagination.component";
import { PaginationService } from '../../../shared/components/pagination/pagination.service';


@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  private readonly productService = inject(ProductService);
  paginationService = inject(PaginationService);
  
  productsResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1}),
    stream: ({ params }) => {
      return this.productService.getProducts({
        offset: +params.page * 9
      })
    }
  })
 }