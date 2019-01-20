import { Pipe, PipeTransform } from '@angular/core';
import {DataStruct} from './Interface/DataStruct';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(item: any[], query: string, searchBy: string): any[] {
    console.log("In Transfrom")
    
    if(!query) 
        return item;
query = query.toLocaleLowerCase();
return item.filter( data => {
      return data[searchBy].toLocaleLowerCase().includes(query);
    });
   }
}