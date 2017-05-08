export class Step {
    constructor(
        public stepNr: number,
        public jointType: number,
        public duration: number,
        public maxScore: number,
        public stepType: number,
        public radius: number,
        public trackingLineOffset: number,
        public x: number,
        public x1: number,
        public x2: number,
        public x3: number,
        public y: number,
        public y1: number,
        public y2: number,
        public y3: number
    ) {
    }
    public static createNewStep(stepNr:number): Step {
        return new Step(stepNr, null, null, null, null, null, null, null, null, null, null, null, null, null, null)
    }

}