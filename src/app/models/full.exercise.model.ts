import { Step } from "app/models/step.model";

export class FullExercise {
    constructor(
        public exerciseId: string,
        public name: string,
        public description: string,
        public steps: Step[]
    ) { }
    public static createNewFullExercise(): FullExercise {
        return new FullExercise(null, null, null, new Array<Step>());
    }
}