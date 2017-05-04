import { Component } from '@angular/core';

export class TuteeId {
    constructor(
        public uid:string
    )
    { }

    public static createEmptyUser(): TuteeId {
        return new TuteeId('');
    }
}