export class Picture {
    id: string
    title: string
    url: string
    uploader: string
    likes: number
    views: number

    constructor(id: string, title: string, url: string, uploader: string, likes = 0, views = 0) {
        this.id = id
        this.title = title
        this.url = url
        this.uploader = uploader
        this.likes = likes
        this.views = views
    }
};
