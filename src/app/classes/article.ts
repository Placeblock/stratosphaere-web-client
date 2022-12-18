export class Article {
    id: number
    title: string | null = null;
    description: string | null = null;
    cover_image_url: string | null = null;
    author: string | null = null;
    published: boolean | null = null;
    publish_date: Date | null = null;
    content: string | null = null;


    constructor(id: number) {
        this.id = id;
    }
}