import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ KinectJoint} from '../../../models/kinectJoint.model'
import Bezier from 'bezier-js';

@Component({
    selector: 'exercise',
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.css']
})

export class ExerciseComponent implements OnInit, AfterViewInit {
    teller: number[][] = [[0, 2, 3], [1, 3, 4, 5], [2, 6]];
    newExerciseSteps: number[] = [0];
    viewState: boolean = true;
    lineBool: boolean = false;
    kinectJoints: KinectJoint[] = new Array<KinectJoint>();
    //variables to draw the new line
    public canvas: HTMLCanvasElement;
    public context;
    public touchPointX:Array<number> = new Array<number>();
    public touchPointY:Array<number> = new Array<number>();
    public arcx: Array<number> = new Array<number>();
    public arcy: Array<number> = new Array<number>();
    public drawOk: Array<boolean> = new Array<boolean>();
    public radius = 7;

    constructor(private router: Router) {
    }

    ngOnInit(){
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

    ngAfterViewInit(): void {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.context = this.canvas.getContext('2d');
    }


    changeCheckbox(checkbox: any) {
        if (checkbox.currentTarget.childNodes[1].checked == false) {
            checkbox.currentTarget.childNodes[1].checked = true;
        }
        else {
            checkbox.currentTarget.childNodes[1].checked = false
        }
    }

    changeMode() {
        if (this.viewState) {
            this.viewState = false;
            this.teller[this.teller.length] = [9, 8, 7];
        }
        else {
            this.viewState = true;
            this.newExerciseSteps = [0];
            this.teller.splice(this.teller.length - 1, 1);
        }
    }

    addStep() {
        this.newExerciseSteps[this.newExerciseSteps.length] = 1;
        console.log(this.newExerciseSteps);
    }

    removeStep() {
        this.newExerciseSteps.splice(this.newExerciseSteps.length - 1, 1);
    }

    //method called in the html to start the drawing of a new "Volglijn"
    public drawNewLine() {
        var mousex;
        var mousey;
        this.lineBool = true;
        this.recreateCanvas();
        this.initializeCircles(4);
        this.drawTrackingLinePoints();
        this.canvas.addEventListener("mousedown", e => {
            mousex = e.clientX - this.canvas.offsetLeft;
            mousey = e.clientY - this.canvas.offsetTop;
            //calculate the distance between the circle and the mousepointer
            this.arcx.forEach((element, i) => {
                var distance = Math.sqrt((mousex - this.arcx[i]) * (mousex - this.arcx[i]) + (mousey - this.arcy[i]) * (mousey - this.arcy[i]));
                if (distance < this.radius) //you may drag the circle now
                {
                    this.drawOk[i] = true;
                }
            })
        })

        this.canvas.addEventListener("mouseup", e => {
            this.drawOk.forEach((e, i) => this.drawOk[i] = false);
        })

        this.canvas.addEventListener("mousemove", e => {
            //drag the circle
            this.drawOk.forEach((element, i) => {
                if (element) {
                    this.arcx[i] = e.clientX - this.canvas.offsetLeft;
                    this.arcy[i] = e.clientY - this.canvas.offsetTop;
                }
            })
            //redraw the circles and beziercurce
            this.redrawTrackingLinePoints();
            this.drawTrackingLine();
            this.drawBezierDistance(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop);
        })
    }

    private drawTrackingLinePoints() {
        for (var i = 0; i < this.arcx.length; i++) {
            this.context.beginPath();
            this.context.arc(this.arcx[i], this.arcy[i], this.radius, 0, 2 * Math.PI, false);
            if (i==0)this.context.fillStyle = "green";else this.context.fillStyle="red";
            this.context.fill();
            this.context.closePath();
        }
    }

    private initializeCircles(numberOfCircles:number) {
        this.context = this.canvas.getContext("2d");
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.arcx.length < numberOfCircles) {
            for (var i = 0; i < numberOfCircles; i++) {
                this.arcx.push((this.canvas.width / 2) + (i * 10));
                this.arcy.push((this.canvas.height / 2) + (i * 10));
                this.drawOk.push(false);
            }
        }
    }

    private redrawTrackingLinePoints() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.arcx.forEach((circle, i) => {
            this.context.beginPath();
            this.context.arc(this.arcx[i], this.arcy[i], this.radius, 0, 2 * Math.PI, false);
            if (i==0)this.context.fillStyle = "green";else this.context.fillStyle="red";
            this.context.fill();
        })
    }

    private drawTrackingLine() {
        this.context.beginPath();
        this.context.moveTo(this.arcx[0], this.arcy[0]);
        this.context.bezierCurveTo(this.arcx[1], this.arcy[1], this.arcx[2], this.arcy[2], this.arcx[3], this.arcy[3]);
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'blue';
        this.context.stroke();
        this.context.closePath();
    }

    //clone the canvas to remove the eventListeners
    private recreateCanvas() {        
            var newEl = this.canvas.cloneNode(false);
            while (this.canvas.hasChildNodes()) newEl.appendChild(this.canvas.firstChild);
            this.canvas.parentNode.replaceChild(newEl, this.canvas);
            this.canvas = <HTMLCanvasElement>newEl;
            this.context=this.canvas.getContext('2d');
    }

    //draw the line between the 'volglijn' and the mouse
    private drawBezierDistance(mouseX, mouseY) {
        var curve: Bezier = new Bezier(this.arcx[0], this.arcy[0],this.arcx[1], this.arcy[1], this.arcx[2], this.arcy[2], this.arcx[3], this.arcy[3]);
        var mouse = { x: mouseX, y: mouseY };
        var p = curve.project(mouse);

        this.context.beginPath();
        this.context.moveTo(mouseX,mouseY);
        this.context.lineTo(p.x,p.y);
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'blue';
        this.context.stroke();
        this.context.closePath();
    }





    //draw the touchpoints
    public drawNewTouchPoint() {
        var mousex;
        var mousey;
        this.lineBool = false;
        this.recreateCanvas();
        this.initializeTouchPoint(1);
        this.drawTouchPoints();
        this.canvas.addEventListener("mousedown", e => {
            mousex = e.clientX - this.canvas.offsetLeft;
            mousey = e.clientY - this.canvas.offsetTop;
            //calculate the distance between the circle and the mousepointer
            this.touchPointX.forEach((element, i) => {
                var distance = Math.sqrt((mousex - this.touchPointX[i]) * (mousex - this.touchPointX[i]) + (mousey - this.touchPointY[i]) * (mousey - this.touchPointY[i]));
                if (distance < this.radius) //you may drag the circle now
                {
                    this.drawOk[i] = true;
                }
            })
        });
        this.canvas.addEventListener("mouseup", e => {
            this.drawOk.forEach((e, i) => this.drawOk[i] = false);
        });
        this.canvas.addEventListener("mousemove", e => {
            //drag the circle
            this.drawOk.forEach((element, i) => {
                if (element) {
                    this.touchPointX[i] = e.clientX - this.canvas.offsetLeft;
                    this.touchPointY[i] = e.clientY - this.canvas.offsetTop;
                }
            });
            //redraw the circles and beziercurce
            this.redrawTouchPoints();
        })
    }

    private initializeTouchPoint(numberOfCircles:number) {
        this.context = this.canvas.getContext("2d");
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.touchPointX.length < numberOfCircles) {
            for (var i = 0; i < numberOfCircles; i++) {
                this.touchPointX.push((this.canvas.width / 2) + (i * 10));
                this.touchPointY.push((this.canvas.height / 2) + (i * 10));
                this.drawOk.push(false);
            }
        }
    }

    private drawTouchPoints() {
        for (var i = 0; i < this.touchPointX.length; i++) {
            this.context.beginPath();
            this.context.arc(this.touchPointX[i], this.touchPointY[i], this.radius, 0, 2 * Math.PI, false);
            this.context.fillStyle = "red";
            this.context.fill();
            this.context.closePath();
        }
    }

    private redrawTouchPoints() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.touchPointX.forEach((circle, i) => {
            this.context.beginPath();
            this.context.arc(this.touchPointX[i], this.touchPointY[i], this.radius, 0, 2 * Math.PI, false);
            this.context.fillStyle = "red";
            this.context.fill();
        })
    }
} 