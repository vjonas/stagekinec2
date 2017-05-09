import { Component } from '@angular/core';
import { User } from './user.model';

export class Tutor {
    constructor(
        public uid:string,
        public name:string,
        public lastName:string,
        public email:string,
    )
    { }

    public static createEmptyUser(): Tutor {
        return new Tutor('','','','');
    }
}