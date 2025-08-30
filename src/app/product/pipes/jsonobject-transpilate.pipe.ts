import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'JsonObjectTranspilePipe'
})

export class JsonObjectTranspilePipe implements PipeTransform {
    transform(value: Object): any {
        return JSON.stringify(value, null, 2);
    }
}