import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.imageUrl + '/'
const DEFAULT_IMAGE = environment.staticImagesPath + '/no-image.jpg'

@Pipe({
    name: 'productImage'
})

export class ProductImagePipe implements PipeTransform {
    transform(value: string | string[]): any {

        if(typeof value === 'string') {
            return BASE_URL + value;
        }

        if(Array.isArray(value)){
            return BASE_URL + value[0]
        }
        
        return DEFAULT_IMAGE

    }
}