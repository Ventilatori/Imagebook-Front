interface BasePicture {
    title: string
    path: string
    description: string
    numberOfLikes: number
    isLiked?: boolean
    timePosted: Date
    uploader: string
}

export interface APIPicture extends BasePicture {
    taggedUsers: string
    hashtags: string
}

export interface Picture extends BasePicture {
    taggedUsers: string[]
    hashtags: string[]
}
