import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../classes/article';

@Pipe({
  name: 'filterPublished'
})
export class FilterPublishedPipe implements PipeTransform {

  transform(array: Article[] | null): Article[] {
    if (array == null) return [];
    return array.filter(article => article.published);
  }

}
