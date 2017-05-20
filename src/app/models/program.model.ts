import { Exercise } from "app/models/exercise.model";

export class Program
{
    constructor(
        public programId:number,
        public name:string,
        public score:number,
        public exercises:Exercise[]
    )
    {}

    public static createEmptyProgram()
    {
        return new Program(null,'',0,null);
    }

    public static createEmptyPrograms(): Program[] {
        return new Array<Program>();
    }
}