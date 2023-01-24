import { User } from "./user.model";
export class Data {
    [x: string]: any;
    constructor(
        public data: User,
        public statusCode: number,
        public errorMessage: string
    ) { }
}