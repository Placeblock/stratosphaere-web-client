export class Article {
    id: number
    title: string | null = null;
    description: string | null = null;
    cover_image_url: string | null = null;
    author: string | null = null;
    published: boolean | null = null;
    publish_date: Date | null = null;
    content: string | null = null;
    updated_at: Date | null = null;


    constructor(id: number, 
            title: string | null, 
            description: string | null, 
            cover_image_url: string | null, 
            author: string | null, 
            published: boolean | null,
            publish_date: Date | null,
            content: string | null,
            updated_at: Date | null) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.cover_image_url = cover_image_url;
        this.author = author;
        this.published = published;
        this.publish_date = publish_date;
        this.content = content;
        this.updated_at = updated_at;
    }

    serialize(): {} {
        return {"id":this.id,
        "title":this.title,
        "description": this.description, 
        "cover_image_url": this.cover_image_url,
        "author": this.author,
        "published": this.published,
        "publish_date": this.publish_date?.toISOString(),
        "content": this.content,
        "updated_at": this.updated_at?.toISOString()}
    }

    static deserialize(data: any): Article {
        return new Article(data.id, 
            data.title, 
            data.description, 
            data.cover_image_url, 
            data.author, 
            data.published, 
            new Date(Date.parse(data.publish_date)), 
            data.content,
            new Date(Date.parse(data.updated_at)));
    }
}