import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/product.interface';
import { Observable } from 'rxjs';
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

    getProducts(options: Options): Observable<ProductsResponse> {

        const {limit = 9, offset = 0, gender = ''} = options;

        return this.http.get<ProductsResponse>(`${BASE_URL}/products`, {
            params: {
                limit,
                offset,
                gender
            }
        })
    }

    getProduct(id: string): Observable<Product>{

        return this.http.get<Product>(`${BASE_URL}/products/${id}`)
    }
}