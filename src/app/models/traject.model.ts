import { Exercise } from "app/models/exercise.model";

export class Traject
{
    constructor(
        public id:number,
        public name:string,
        public score:number,
        public excercises:Exercise[]
    )
    {}

    public static createEmptyTraject()
    {
        return new Traject(0,'',0,null);
    }

    public static createEmptyTrajects(): Traject[] {
        return new Array<Traject>();
    }
}