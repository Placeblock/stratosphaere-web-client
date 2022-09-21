export class Article {
    id: number
    title: string
    description: string
    content: string
    coverImageUrl: string
    author: string
    published: boolean
    publishDate: Date

    constructor(id: number, title: string, description: string, content: string, coverImageUrl: string, author: string, published: boolean, publishDate: Date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.content = content;
        this.coverImageUrl = coverImageUrl;
        this.author = author;
        this.published = published;
        this.publishDate = publishDate;
    }
}
