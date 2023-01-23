export class Data {
    [x: string]: any;
    constructor(
        public data: any,
        public statusCode: number,
        public errorMessage: string
    ) { }
}