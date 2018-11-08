import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)return null;
        if(!args)return value;

        else args = args.toLowerCase();

        return value.filter(function(item){
            return (item.title.toLowerCase().includes(args)) || (item.description.toLowerCase().includes(args)) ;
        });
    return null;
  }

}
