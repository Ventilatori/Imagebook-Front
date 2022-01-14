export interface APIPicture {
    title: string
    path: string
    description: string
    numberOfLikes: number
    isLiked?: boolean
    timePosted: Date
}

export interface Picture extends APIPicture {
    uploader: string
}
