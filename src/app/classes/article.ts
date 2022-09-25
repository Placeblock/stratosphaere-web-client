export class Article {
    id: number
    title: string
    description: string
    content: string
    cover_image_url: string
    author: string
    published: boolean
    publish_date: number

    constructor(id: number, title: string, description: string, content: string, cover_image_url: string, author: string, published: boolean, publish_date: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.content = content;
        this.cover_image_url = cover_image_url;
        this.author = author;
        this.published = published;
        this.publish_date = publish_date;
    }
}
