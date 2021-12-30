// export class Picture {
//     constructor(
//         public id: string, 
//         public title: string, 
//         public url: string,
//         public uploader: string,
//         public likes = 0,
//         public views = 0
//     ) {}
// };

export interface Picture {
    id: string
    title: string
    url: string
    uploader: string
    likes: number
    views: number
}
