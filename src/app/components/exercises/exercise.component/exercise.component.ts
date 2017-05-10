import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KinectJoint } from '../../../models/kinectJoint.model'
import Bezier from 'bezier-js';
import { FullExercise } from "app/models/full.exercise.model";
import { ExerciseService } from "app/services/exercise.service";
import { Step } from "app/models/step.model";

@Component({
    selector: 'exercise',
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.scss']
})

export class ExerciseComponent implements OnInit, AfterViewInit {
    teller: number[][] = [[0, 2, 3], [1, 3, 4, 5], [2, 6]];
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

    constructor(private router: Router, private _exerciseService: ExerciseService) {
        this.newExercise = FullExercise.createNewFullExercise();
        this._exerciseService.getAllExercisesFromMentor().subscribe(exercices => {
            this.exercisesOfMentor = exercices;
        })
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
        console.log(this.newExercise.steps[this.activeStepToDraw].stepType);
        if (this.newExercise.steps[this.activeStepToDraw].stepType == 0)
            this.drawNewTouchPoint();
        else
            this.drawNewTrackingLine();
    }

    private changeMode() {
        if (this.viewState) {
            this.viewState = false;
            this.exercisesOfMentor.splice(0, this.exercisesOfMentor.length); 
            this.exercisesOfMentor.push(FullExercise.createNewFullExercise());
            this.newExercise=FullExercise.createNewFullExercise();            
        }
        else {
            this.viewState = true;
            this._exerciseService.getAllExercisesFromMentor().subscribe(exercices => {
                this.exercisesOfMentor = exercices;
            })
            this.recreateCanvas();
            this.newExercise=FullExercise.createNewFullExercise();
        }
    }

    private onChangeExercise(exerciseId: string) {
        this.exercisesOfMentor.forEach(ex => {
            if (ex["$key"] == exerciseId)
                this.newExercise = ex;
        })
    }

    addStep() {
        this.newExercise.steps.push(Step.createNewStep(this.newExercise.steps.length, this.canvas.width, this.canvas.height));
    }

    removeStep(stepNr: number) {
        console.log(stepNr);
        this.newExercise.steps.splice(stepNr, 1);
        this.newExercise.steps.forEach((step, counter) => {
            this.newExercise.steps[counter].stepNr = counter;
        })
    }

    public drawNewTrackingLine() {
        var mousex;
        var mousey;
        this.showTrackingLineDetails = true;
        this.recreateCanvas();
        this.drawTrackingLinePoints();
        this.newExercise.steps[this.activeStepToDraw].stepType = 1;
        this.canvas.addEventListener("mousedown", e => {
            mousex = e.clientX - this.canvas.offsetLeft;
            mousey = e.clientY - this.canvas.offsetTop;
            for (var i = 0; i < 4; i++) {
                var distance = Math.sqrt((mousex - this.newExercise.steps[this.activeStepToDraw]["x" + i]) * (mousex - this.newExercise.steps[this.activeStepToDraw]["x" + i]) + (mousey - this.newExercise.steps[this.activeStepToDraw]["y" + i]) * (mousey - this.newExercise.steps[this.activeStepToDraw]["y" + i]));
                if (distance < this.newExercise.steps[this.activeStepToDraw].radius)
                {
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
            this.redrawTrackingLinePoints();
            this.drawTrackingLine();
            this.drawBezierDistance(e.clientX - (window.innerWidth*.05), e.clientY - this.canvas.parentElement.parentElement.parentElement.offsetTop);
            console.log(this.canvas.parentElement.parentElement.parentElement.offsetTop);
        })
    }

    private drawTrackingLinePoints() {
        for (var i = 0; i < 4; i++) {
            this.context.beginPath();
            this.context.arc(this.newExercise.steps[this.activeStepToDraw]["x" + i], this.newExercise.steps[this.activeStepToDraw]["y" + i], this.newExercise.steps[this.activeStepToDraw].radius, 0, 2 * Math.PI, false);
            if (i == 0) this.context.fillStyle = "green"; else this.context.fillStyle = "red";
            this.context.fill();
            this.context.closePath();
        }
    }

    private redrawTrackingLinePoints() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < 4; i++) {
            this.context.beginPath();
            this.context.arc(this.newExercise.steps[this.activeStepToDraw]["x" + i], this.newExercise.steps[this.activeStepToDraw]["y" + i], this.newExercise.steps[this.activeStepToDraw].radius, 0, 2 * Math.PI, false);
            if (i == 0) this.context.fillStyle = "green"; else this.context.fillStyle = "red";
            this.context.fill();
        }
    }

    private drawTrackingLine() {
        this.context.beginPath();
        this.context.moveTo(this.newExercise.steps[this.activeStepToDraw].x0, this.newExercise.steps[this.activeStepToDraw].y0);
        this.context.bezierCurveTo(this.newExercise.steps[this.activeStepToDraw].x1, this.newExercise.steps[this.activeStepToDraw].y1, this.newExercise.steps[this.activeStepToDraw].x2, this.newExercise.steps[this.activeStepToDraw].y2, this.newExercise.steps[this.activeStepToDraw].x3, this.newExercise.steps[this.activeStepToDraw].y3);
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'blue';
        this.context.stroke();
        this.context.closePath();
    }

    private recreateCanvas() {
        var newEl = this.canvas.cloneNode(false);
        while (this.canvas.hasChildNodes()) newEl.appendChild(this.canvas.firstChild);
        this.canvas.parentNode.replaceChild(newEl, this.canvas);
        this.canvas = <HTMLCanvasElement>newEl;
        this.context = this.canvas.getContext('2d');
    }

    private drawBezierDistance(mouseX, mouseY) {
        var curve: Bezier = new Bezier(this.newExercise.steps[this.activeStepToDraw].x0, this.newExercise.steps[this.activeStepToDraw].y0, this.newExercise.steps[this.activeStepToDraw].x1, this.newExercise.steps[this.activeStepToDraw].y1, this.newExercise.steps[this.activeStepToDraw].x2, this.newExercise.steps[this.activeStepToDraw].y2, this.newExercise.steps[this.activeStepToDraw].x3, this.newExercise.steps[this.activeStepToDraw].y3);
        var mouse = { x: mouseX, y: mouseY };
        var p = curve.project(mouse);

        this.context.beginPath();
        this.context.moveTo(mouseX, mouseY);
        this.context.lineTo(p.x, p.y);
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'blue';
        this.context.stroke();
        this.context.closePath();
    }

    public drawNewTouchPoint() {
        var mousex;
        var mousey;
        this.showTrackingLineDetails = false;
        this.recreateCanvas();
        this.drawTouchPoints();
        this.newExercise.steps[this.activeStepToDraw].stepType = 0;       
        this.canvas.addEventListener("mousedown", e => {
            mousex = e.clientX - this.canvas.offsetLeft;
            mousey = e.clientY - this.canvas.offsetTop;
            var distance = Math.sqrt((mousex - this.newExercise.steps[this.activeStepToDraw].x0) * (mousex - this.newExercise.steps[this.activeStepToDraw].x0) + (mousey - this.newExercise.steps[this.activeStepToDraw].y0) * (mousey - this.newExercise.steps[this.activeStepToDraw].y0));
            if (distance < this.newExercise.steps[this.activeStepToDraw].radius)
            {
                this.drawOk[0] = true;
            }

        });
        this.canvas.addEventListener("mouseup", e => {
            this.drawOk[0] = false;
        });
        this.canvas.addEventListener("mousemove", e => {
            if (this.drawOk[0]) {
                this.newExercise.steps[this.activeStepToDraw].x0 = e.clientX - this.canvas.offsetLeft;
                this.newExercise.steps[this.activeStepToDraw].y0 = e.clientY - this.canvas.offsetTop;
            }
            this.redrawTouchPoints();
        })
    }

    private drawTouchPoints() {
        this.context.beginPath();
        this.context.arc(this.newExercise.steps[this.activeStepToDraw].x0, this.newExercise.steps[this.activeStepToDraw].y0, this.newExercise.steps[this.activeStepToDraw].radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = "red";
        this.context.fill();
        this.context.closePath();
    }

    private redrawTouchPoints() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.beginPath();
        this.context.arc(this.newExercise.steps[this.activeStepToDraw].x0, this.newExercise.steps[this.activeStepToDraw].y0, this.newExercise.steps[this.activeStepToDraw].radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = "red";
        this.context.fill();
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
        console.log("createnewexmethode:" + this.newExercise.description + this.newExercise.name);

        this._exerciseService.createNewExcercise(this.newExercise);

    }
} 