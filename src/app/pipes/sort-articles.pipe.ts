import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../classes/article';

@Pipe({
  name: 'sortArticles'
})
export class SortArticlesPipe implements PipeTransform {

  transform(array: Article[] | null): Article[] {
    if (array == null) return [];
    let articleArray = [...array]
    console.log(array);
    articleArray.sort((a: Article, b: Article) => {
      return 1;
    })
    return articleArray;
  }

}
