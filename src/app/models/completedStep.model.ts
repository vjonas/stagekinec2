export class CompletedStep {
    constructor(
        public date: Date,
        public duration: number,
        public score: number,
        public stepNr: number
    ) { }
}