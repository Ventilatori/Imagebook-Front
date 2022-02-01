import {Picture} from "./picture.model";

export interface APIUser {
    name: string
    email: string
    picture: string
    isFollowed: boolean
}

export interface User extends APIUser {
    uploads: Picture[]
    tagged: Picture[]
}
