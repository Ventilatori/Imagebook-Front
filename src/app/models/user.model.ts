export class User {
    constructor(
        public id: string, 
        public name: string, 
        public email: string,
    ) {}
};

export interface IUser {
    id: string
    name: string
    email: string
}
