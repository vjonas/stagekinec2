import { Step } from "app/models/step.model";

export class FullExercise
{
    constructor(
        public exerciseId:string,
        public name:string,
        public description:string,
        public steps:Step[]
    ){}
}