import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string  , status : Number): any[] {

    
    if(!items) return [];
    if(!searchText) return items;
searchText = searchText.toLowerCase();
return items.filter( it => {
    if(status == 1){
        return it.activity_name.toLowerCase().includes(searchText);
    }else if(status == 2){
        return it.first_name.toLowerCase().includes(searchText) || it.last_name.toLowerCase().includes(searchText);
        
    }
    });


//     if(!items) return [];
//     if(!searchText) return items;
// searchText = searchText.toLowerCase();
// return items.filter( it => {
//     if(status == 1){
//         return it.activity_name.toLowerCase().includes(searchText);
//     }else if(status == 2){
//         return it.first_name.toLowerCase().includes(searchText);
//     }
      
//     });
 
    
   }
}
//first_name