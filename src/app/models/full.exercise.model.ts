import { Step } from "app/models/step.model";

export class FullExercise {
    constructor(
        public mentorUid:string,
        public name: string,
        public description: string,
        public steps: Step[]
    ) { }
    public static createNewFullExercise(): FullExercise {
        return new FullExercise(null, "NewExercise","", new Array<Step>());
    }
}