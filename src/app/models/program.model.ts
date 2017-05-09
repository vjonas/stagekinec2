import { Exercise } from "app/models/exercise.model";

export class Program
{
    constructor(
        public id:number,
        public name:string,
        public score:number,
        public excercises:Exercise[]
    )
    {}

    public static createEmptyProgram()
    {
        return new Program(0,'',0,null);
    }

    public static createEmptyPrograms(): Program[] {
        return new Array<Program>();
    }
}