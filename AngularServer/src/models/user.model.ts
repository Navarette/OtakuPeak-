export class User {
    constructor(
        public username: string = '',
        public email: string = '',
        public pwd: string = '',
        public id: number = -1,
        public administrator : boolean = false,
    ) { }
}