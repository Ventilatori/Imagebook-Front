import {Picture} from "./picture.model";

// export class User {
//     constructor(
//         public id: string, 
//         public name: string, 
//         public email: string,
//     ) {}
// };

export interface User {
    id: string
    name: string
    email: string
    picture: string
    uploads: Picture[]
    tagged: Picture[]
}
