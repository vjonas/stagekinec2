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
        public y3: number,
        public secondJointType:number
    ) {
    }
    public static createNewStep(stepNr:number,canvasWidth:number,canvasHeight:number): Step {
        return new Step(stepNr, 7, 10,15, 0, 15, 50,299,417,573,669,200,94,94,200,11);
    }

    public static createNewCalibrationStep(): Step{
        return new Step(0,7,0,10,2,15,30,300,673,0,0,247,247,0,0,11);
    }
}