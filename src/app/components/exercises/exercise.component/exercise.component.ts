import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KinectJoint } from '../../../models/kinectJoint.model'
import { FullExercise } from "app/models/full.exercise.model";
import { ExerciseService } from "app/services/exercise.service";
import { DrawService } from "../../../services/draw.service";
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

    constructor(private router: Router, private _exerciseService: ExerciseService, private _drawService: DrawService) {
        this.newExercise = FullExercise.createNewFullExercise();
        this._exerciseService.getAllExercisesFromMentor().subscribe(exercices => {
            this.exercisesOfMentor = exercices;
        });     
    }

    ngOnInit() {
        this.fillComboboxWithJoints();
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
            this.drawNewTouchPoint(false);
        else if (this.newExercise.steps[this.activeStepToDraw].stepType == 2)
            this.drawNewTouchPoint(true);
        else
            this.drawNewTrackingLine();
    }

    private changeMode() {
        if (this.viewState) {
            this.viewState = false;
            this.exercisesOfMentor.splice(0, this.exercisesOfMentor.length);
            this.exercisesOfMentor.push(FullExercise.createNewFullExercise());
            this.newExercise = FullExercise.createNewFullExercise();
            this.newExercise.steps.push(new Step(0,7,0,10,2,15,30,300,673,0,0,247,247,0,0,11));


        }
        else {
            this.viewState = true;
            this._exerciseService.getAllExercisesFromMentor().subscribe(exercices => {
                this.exercisesOfMentor = exercices;
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

    public drawNewTrackingLine() {
        const self = this;
        var mousex;
        var mousey;
        this.showTrackingLineDetails = true;
        this.context = this._drawService.recreateCanvas(this.canvas);
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this._drawService.drawTrackingLine(this.canvas, this.newExercise, this.activeStepToDraw);
        this.newExercise.steps[this.activeStepToDraw].stepType = 1;
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

    public drawNewTouchPoint(activateSecondTouchPoint: boolean) {
        var mousex;
        var mousey;
        this.showTrackingLineDetails = false;
        this.context = this._drawService.recreateCanvas(this.canvas);
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        if (activateSecondTouchPoint)
            this.newExercise.steps[this.activeStepToDraw].stepType = 2;
        else
            this.newExercise.steps[this.activeStepToDraw].stepType = 0;
        this._drawService.drawTouchPoints(this.canvas, this.newExercise, this.activeStepToDraw);
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

    private fillComboboxWithJoints() {
        this.kinectJoints.push(new KinectJoint(0, "Base of the spine"));
        this.kinectJoints.push(new KinectJoint(1, "Middle of the spine"));
        this.kinectJoints.push(new KinectJoint(2, "Neck"));
        this.kinectJoints.push(new KinectJoint(3, "Head"));
        this.kinectJoints.push(new KinectJoint(4, "Left shoulder"));
        this.kinectJoints.push(new KinectJoint(5, "Left elbow"));
        this.kinectJoints.push(new KinectJoint(6, "Left wrist"));
        this.kinectJoints.push(new KinectJoint(7, "Left hand"));
        this.kinectJoints.push(new KinectJoint(8, "Right shoulder"));
        this.kinectJoints.push(new KinectJoint(9, "Right elbow"));
        this.kinectJoints.push(new KinectJoint(10, "Right wrist"));
        this.kinectJoints.push(new KinectJoint(11, "Right hand"));
        this.kinectJoints.push(new KinectJoint(12, "Left hip"));
        this.kinectJoints.push(new KinectJoint(13, "Left knee"));
        this.kinectJoints.push(new KinectJoint(14, "Left ankle"));
        this.kinectJoints.push(new KinectJoint(15, "Left foot"));
        this.kinectJoints.push(new KinectJoint(16, "Right hip"));
        this.kinectJoints.push(new KinectJoint(17, "Right knee"));
        this.kinectJoints.push(new KinectJoint(18, "Right ankle"));
        this.kinectJoints.push(new KinectJoint(19, "Right foot"));
        this.kinectJoints.push(new KinectJoint(20, "Spine at the shoulder"));
        this.kinectJoints.push(new KinectJoint(21, "Tip of the left hand"));
        this.kinectJoints.push(new KinectJoint(22, "Left thumb"));
        this.kinectJoints.push(new KinectJoint(23, "Tip of the right hand"));
        this.kinectJoints.push(new KinectJoint(24, "Right thumb"));
    }

    private createNewExercise() {
        this._exerciseService.createNewExcercise(this.newExercise);
    }

    private checkBottomControls(bottomControlsState: number) {
        if (bottomControlsState == 0) //1 touchpoint
        {
            if (!this.viewState && this.newExercise.steps[this.activeStepToDraw]!= undefined && this.newExercise.steps[this.activeStepToDraw].stepType == 0)
                return true
            else
                return false;

        }
        else if (bottomControlsState == 1) //trackingline
        {
            if (!this.viewState && this.newExercise.steps[this.activeStepToDraw]!= undefined && this.newExercise.steps[this.activeStepToDraw].stepType == 1)
                return true
            else
                return false;

        }
        else if (bottomControlsState == 2) //2 TouchPoints
        {
            if (!this.viewState && this.newExercise.steps[this.activeStepToDraw]!= undefined && this.newExercise.steps[this.activeStepToDraw].stepType == 2)
                return true
            else
                return false;
        }

    }
} 