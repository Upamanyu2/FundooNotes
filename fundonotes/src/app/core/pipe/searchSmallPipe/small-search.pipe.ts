import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smallSearch'
})
export class SmallSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;

    else args = args.toLowerCase();

    return value.filter(function(item){
      return JSON.stringify(item).toLowerCase().includes(args);
    });
    return null;
  }

}
