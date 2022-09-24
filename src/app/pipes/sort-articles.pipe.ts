import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../classes/article';

@Pipe({
  name: 'sortArticles'
})
export class SortArticlesPipe implements PipeTransform {

  transform(array: Article[] | null): Article[] {
    if (array == null) return [];
    let articleArray = [...array]
    articleArray.sort((a: Article, b: Article) => {
      if (a.publishDate > b.publishDate) {
        return -1;
      } else if (a.publishDate < b.publishDate) {
        return 1;
      } else {
        return 0;
      }
    })
    return articleArray;
  }

}
