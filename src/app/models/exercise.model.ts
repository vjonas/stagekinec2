export class Exercise
{
    constructor(
        public excerciseid:string,
        public score:number
    )
{}

public static createEmptyExcercise()
{
    return new Exercise('',0);
}

public static createEmptyExcercises(): Exercise[] {
        return new Array<Exercise>();
    }
}