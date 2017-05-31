import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KinectJoint } from '../../../models/kinectJoint.model'
import { FullExercise } from "app/models/full.exercise.model";
import { ExerciseService } from "app/services/exercise.service";
import { DrawService } from "../../../services/draw.service";
import { JointService } from "../../../services/joint.service";
import { Step } from "app/models/step.model";

@Component({
    selector: 'exercise',
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.scss']
})

export class ExerciseComponent implements OnInit, AfterViewInit {
    newExerciseSteps: number[] = [0];
    viewState: boolean = true;
    showTrackingLineDetails: boolean = false;
    kinectJoints: KinectJoint[] = new Array<KinectJoint>();
    public canvas: HTMLCanvasElement;
    public context;
    public drawOk: Array<boolean> = new Array<boolean>();
    private newExercise: FullExercise;
    private activeStepToDraw: number = 0;
    private exercisesOfMentor: FullExercise[];

    constructor(private router: Router, private _exerciseService: ExerciseService, private _drawService: DrawService, private _jointService: JointService) {
        this.newExercise = FullExercise.createNewFullExercise();
        this._exerciseService.getAllExercisesFromMentor().subscribe(exercices => {
            console.log("exercises subscribe");
            console.log(exercices);
            this.exercisesOfMentor = exercices;
            if(exercices.length>0)
            {
                this.newExercise = exercices[0];
            }
        });     
    }

    ngOnInit() {
        this.getJointList();
    }

    ngAfterViewInit(): void {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.context = this.canvas.getContext('2d');
    }


    changeCheckbox(checkbox: any, stepNr: number) {
        if (checkbox.currentTarget.childNodes[1].checked == false) {
            checkbox.currentTarget.childNodes[1].checked = true;
            this.activeStepToDraw = stepNr;
        }
        else {
            checkbox.currentTarget.childNodes[1].checked = false
        }
    }

    changeStepToEdit(checkbox: any, stepNr: number) {
        checkbox.currentTarget.childNodes[1].checked = true;
        this.activeStepToDraw = stepNr;
        if (this.newExercise.steps[this.activeStepToDraw].stepType == 0)
            this.drawNewTouchPoint(true,false);
        else if (this.newExercise.steps[this.activeStepToDraw].stepType == 2)
            this.drawNewTouchPoint(true,true);
        else
            this.drawNewTrackingLine(true);
    }

    changeStepToView(checkbox: any, stepNr: number){
        checkbox.currentTarget.childNodes[1].checked = true;
        this.activeStepToDraw = stepNr;
        if (this.newExercise.steps[this.activeStepToDraw].stepType == 0)
            this.drawNewTouchPoint(false,false);
        else if (this.newExercise.steps[this.activeStepToDraw].stepType == 2)
            this.drawNewTouchPoint(false,true);
        else
            this.drawNewTrackingLine(false);
    }

    private changeMode() {
        if (this.viewState) {
            this.viewState = false;
            this.exercisesOfMentor.splice(0, this.exercisesOfMentor.length);
            this.exercisesOfMentor.push(FullExercise.createNewFullExercise());
            this.newExercise = FullExercise.createNewFullExercise();
            this.newExercise.steps.push(Step.createNewCalibrationStep());
            this._drawService.recreateCanvas(this.canvas);
            this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        }
        else {
            this.viewState = true;
            this._exerciseService.getAllExercisesFromMentor().subscribe(exercises => {
                this.exercisesOfMentor = exercises;
                if(exercises.length>0)
                {
                    this.newExercise = exercises[0];
                }
            })
            this._drawService.recreateCanvas(this.canvas);
            this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
            this.newExercise = FullExercise.createNewFullExercise();
        }
    }

    private onChangeExercise(exerciseId: string) {
        this.exercisesOfMentor.forEach(ex => {
            if (ex["$key"] == exerciseId){
                this.newExercise = ex;
                this._drawService.recreateCanvas(this.canvas);
                this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
            }
        })
    }

    addStep() {
        this.newExercise.steps.push(Step.createNewStep(this.newExercise.steps.length, this.canvas.width, this.canvas.height));
    }

    removeStep(stepNr: number) {
        this.newExercise.steps.splice(stepNr, 1);
        this.newExercise.steps.forEach((step, counter) => {
            this.newExercise.steps[counter].stepNr = counter;
        })
    }

    public drawNewTrackingLine(editable: boolean) {
        const self = this;
        var mousex;
        var mousey;
        this.showTrackingLineDetails = true;
        this.context = this._drawService.recreateCanvas(this.canvas);
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this._drawService.drawTrackingLine(this.canvas, this.newExercise, this.activeStepToDraw);
        this.newExercise.steps[this.activeStepToDraw].stepType = 1;
        if(editable){
        this.canvas.addEventListener("mousedown", e => {
            mousex = e.clientX - this.canvas.offsetLeft;
            mousey = e.clientY - this.canvas.offsetTop;
            for (var i = 0; i < 4; i++) {
                var distance = Math.sqrt((mousex - this.newExercise.steps[this.activeStepToDraw]["x" + i]) * (mousex - this.newExercise.steps[this.activeStepToDraw]["x" + i]) + (mousey - this.newExercise.steps[this.activeStepToDraw]["y" + i]) * (mousey - this.newExercise.steps[this.activeStepToDraw]["y" + i]));
                if (distance < this.newExercise.steps[this.activeStepToDraw].radius) {
                    this.drawOk[i] = true;
                }
            }
        })
        
        this.canvas.addEventListener("mouseup", e => {
            this.drawOk.forEach((e, i) => this.drawOk[i] = false);
        })

        this.canvas.addEventListener("mousemove", e => {
            this.drawOk.forEach((element, i) => {
                if (element) {
                    this.newExercise.steps[this.activeStepToDraw]["x" + i] = e.clientX - this.canvas.offsetLeft;
                    this.newExercise.steps[this.activeStepToDraw]["y" + i] = e.clientY - this.canvas.offsetTop;
                }
            })
            this._drawService.drawTrackingLine(this.canvas, this.newExercise, this.activeStepToDraw);
            this._drawService.drawBezierDistance(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop, this.canvas, this.newExercise, this.activeStepToDraw);
        })
        }
    }

    public drawNewTouchPoint(editable:boolean, activateSecondTouchPoint: boolean) {
        var mousex;
        var mousey;
        this.showTrackingLineDetails = false;
        this.context = this._drawService.recreateCanvas(this.canvas);
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        if (activateSecondTouchPoint){
            this.newExercise.steps[this.activeStepToDraw].stepType = 2;
        }
        else{
            this.newExercise.steps[this.activeStepToDraw].stepType = 0;
        }
        this._drawService.drawTouchPoints(this.canvas, this.newExercise, this.activeStepToDraw);
        if(editable){
        this.canvas.addEventListener("mousedown", e => {
            mousex = e.clientX - this.canvas.offsetLeft;
            mousey = e.clientY - this.canvas.offsetTop;
            var distanceToFirstTrackingPoint = Math.sqrt((mousex - this.newExercise.steps[this.activeStepToDraw].x0) * (mousex - this.newExercise.steps[this.activeStepToDraw].x0) + (mousey - this.newExercise.steps[this.activeStepToDraw].y0) * (mousey - this.newExercise.steps[this.activeStepToDraw].y0));
            var distanceToSecondTrackingPoint = Math.sqrt((mousex - this.newExercise.steps[this.activeStepToDraw].x1) * (mousex - this.newExercise.steps[this.activeStepToDraw].x1) + (mousey - this.newExercise.steps[this.activeStepToDraw].y1) * (mousey - this.newExercise.steps[this.activeStepToDraw].y1));
            if (distanceToFirstTrackingPoint < this.newExercise.steps[this.activeStepToDraw].radius) {
                this.drawOk[0] = true;
            }
            if (distanceToSecondTrackingPoint < this.newExercise.steps[this.activeStepToDraw].radius) {
                this.drawOk[1] = true;
            }
        });
        this.canvas.addEventListener("mouseup", e => {
            this.drawOk[0] = false;
            this.drawOk[1] = false;
        });
        this.canvas.addEventListener("mousemove", e => {
            if (this.drawOk[0]) {
                this.newExercise.steps[this.activeStepToDraw].x0 = e.clientX - this.canvas.offsetLeft;
                this.newExercise.steps[this.activeStepToDraw].y0 = e.clientY - this.canvas.offsetTop;
            }
            if (this.drawOk[1]) {
                this.newExercise.steps[this.activeStepToDraw].x1 = e.clientX - this.canvas.offsetLeft;
                this.newExercise.steps[this.activeStepToDraw].y1 = e.clientY - this.canvas.offsetTop;
            }
            this._drawService.drawTouchPoints(this.canvas, this.newExercise, this.activeStepToDraw);
        })
        }
    }

    private getJointList() {
        this.kinectJoints = this._jointService.getJointList();
    }

    private createNewExercise() {
        this._exerciseService.createNewExcercise(this.newExercise);
    }

    private checkBottomControls(bottomControlsState: number) {
            //1 touchpoint
        if (bottomControlsState == 0){
            if (!this.viewState && this.newExercise.steps[this.activeStepToDraw]!= undefined && this.newExercise.steps[this.activeStepToDraw].stepType == 0){
                return true;
            }
            else{
                return false;
            }
        }   //trackingline
        else if (bottomControlsState == 1) {
            if (!this.viewState && this.newExercise.steps[this.activeStepToDraw]!= undefined && this.newExercise.steps[this.activeStepToDraw].stepType == 1){
                return true;
            }
            else{
                return false;
            }
        }   //2 TouchPoints
        else if (bottomControlsState == 2){
            if (!this.viewState && this.newExercise.steps[this.activeStepToDraw]!= undefined && this.newExercise.steps[this.activeStepToDraw].stepType == 2){
                return true
            }
            else{
                return false;
            }
        }
    }
} 