export class Article {
    id: number
    title: string | null = null;
    description: string | null = null;
    cover_image_url: string | null = null;
    author: string | null = null;
    published: boolean | null = null;
    publish_date: Date | null = null;
    content: string | null = null;


    constructor(id: number, 
            title: string | null, 
            description: string | null, 
            cover_image_url: string | null, 
            author: string | null, 
            published: boolean | null,
            publish_date: Date | null,
            content: string | null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.cover_image_url = cover_image_url;
        this.author = author;
        this.published = published;
        this.publish_date = publish_date;
        this.content = content;
    }
}