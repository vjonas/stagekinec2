export class Step {
    constructor(
        public stepNr: number,
        public jointType: number,
        public duration: number,
        public maxScore: number,
        public stepType: number,
        public radius: number,
        public trackingLineOffset: number,
        public x0: number,
        public x1: number,
        public x2: number,
        public x3: number,
        public y0: number,
        public y1: number,
        public y2: number,
        public y3: number
    ) {
    }
    public static createNewStep(stepNr:number,canvasWidth:number,canvasHeight:number): Step {
        return new Step(stepNr, 7, 10,15, 1, 7, 10,canvasWidth/2,canvasWidth/2+10,canvasWidth/2+20,canvasWidth/2+30,canvasHeight/2,canvasHeight/2+10,canvasHeight/2+20,canvasHeight/2+30)
    }

}