import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/product.interface';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.baseUrl

interface Options {
    limit?: number;
    offset?: number;
    gender?: string;
}

@Injectable({providedIn: 'root'})
export class ProductService {
    private readonly http = inject(HttpClient);
    private readonly productsCache = new Map<string, ProductsResponse>();
    private readonly productCache = new Map<string, Product>();

    getProducts(options: Options): Observable<ProductsResponse> {
        const {limit = 9, offset = 0, gender = ''} = options;
        const key = `${limit}-${offset}-${gender}`

        if(this.productsCache.has(key)){
            return of(this.productsCache.get(key)!)
        }

        return this.http.get<ProductsResponse>(`${BASE_URL}/products`, {
            params: {
                limit,
                offset,
                gender
            }
        }).pipe(
            tap((resp) => console.log(resp)),
            tap((resp) => this.productsCache.set(key, resp))
        )
    }

    getProduct(id: string): Observable<Product>{

        if(this.productCache.has(id)){
            return of(this.productCache.get(id)!)
        }

        return this.http.get<Product>(`${BASE_URL}/products/${id}`)
        .pipe(tap((resp) => this.productCache.set(id, resp)))
    }
}