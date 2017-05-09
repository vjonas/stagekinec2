import { Component } from '@angular/core';
import { Program } from "app/models/program.model";

export class User {
    constructor(
        public uid:string,
        public name:string,
        public lastName:string,
        public email:string,
        public weight:string,
        public length: string,
        public birthDate:string,
        public age:number,
        public currentProgram:number,
        public programs:Program[]
    )
    { }

    public static createEmptyUser(): User {
        return new User('','','','','','','',0,0,null);
    }
}