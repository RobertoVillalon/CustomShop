import { ProductService } from '@/product/services/products.service';
import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ProductCardComponent } from "@/product/components/product-card/product-card.component";
import { PaginationComponent } from "@/shared/components/pagination/pagination.component";
import { PaginationService } from '@/shared/components/pagination/pagination.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent   {
  route = inject(ActivatedRoute);
  gender = toSignal(this.route.params.pipe(map(({gender}) => gender)))
  private readonly productService = inject(ProductService);
  paginationService = inject(PaginationService);

  productsResource = rxResource({
    params: () => ({gender: this.gender(), page: this.paginationService.currentPage() - 1}),
    stream: ({ params }) => {
      return this.productService.getProducts({
        gender: params.gender,
        offset: +params.page * 9
      })
    }
  })
}