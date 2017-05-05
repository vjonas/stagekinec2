import { Step } from "app/models/step.model";

export class FullExercise
{
    constructor(
        public exerciseid:string,
        public name:string,
        public description:string,
        public steps:Step[]
    ){}
}