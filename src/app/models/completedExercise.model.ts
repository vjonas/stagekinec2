import { CompletedStep } from './completedStep.model'

export class CompletedExercise{
    constructor(
       public completed: boolean,
       public completedSteps: CompletedStep[],
       public exerciseId: string,
       public programId: number,
       public userId: string
    ){}
}