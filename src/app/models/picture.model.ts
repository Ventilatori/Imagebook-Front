export interface APIPicture {
    title: string
    path: string
    description: string
    numberOfLikes: number
    timePosted: Date
}

export interface Picture extends APIPicture {
    uploader: string
}
