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
    public touchPointX:number=75;
    public touchPointY:number=50;
    public arcx: Array<number> = new Array<number>();
    public arcy: Array<number> = new Array<number>();
    public drawOk: Array<boolean> = new Array<boolean>();
    public radius = 7;
    private curve: any;

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

    public newTouchPoint() {
        this.lineBool = false;
        var canvas: HTMLCanvasElement;
        var ctx;
        var WIDTH = 960;
        var HEIGHT = 540;
        var dragok = false;
        const self = this;

        this.removeCanvasListeners();
        init();
        this.canvas.addEventListener("mousedown", e => {
            if (e.pageX < this.touchPointX + 15 + canvas.offsetLeft && e.pageX > this.touchPointX - 15 +
                canvas.offsetLeft && e.pageY < this.touchPointY + 15 + canvas.offsetTop &&
                e.pageY > this.touchPointY - 15 + canvas.offsetTop) {
                this.touchPointX = e.pageX - canvas.offsetLeft;
                this.touchPointY = e.pageY - canvas.offsetTop;
                dragok = true;
            }
        });

        this.canvas.addEventListener("mouseup", e => {
            dragok = false;
            canvas.onmousemove = null;
        });

        this.canvas.addEventListener("mousemove", e => {
            console.log("drawtouchpoint - mouseup");
            if (dragok) {
                this.touchPointX = e.pageX - canvas.offsetLeft;
                this.touchPointY = e.pageY - canvas.offsetTop;
                draw();
            }
        })

        function init() {
            canvas = <HTMLCanvasElement>document.getElementById("canvas");
            ctx = canvas.getContext("2d");
            WIDTH = Number(canvas.getAttribute("width"));
            console.log(WIDTH);
            HEIGHT = Number(canvas.getAttribute("height"));
            draw();
        }

        function rect(x, y, w, h) {
            ctx.beginPath();
            ctx.rect(x, y, w, h);
            ctx.closePath();
            ctx.fill();
        }

        function draw() {
            clear();
            ctx.fillStyle = "#FF0F00";
            rect(self.touchPointX - 15, self.touchPointY - 15, 30, 30);
        }

        function clear() {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
        }
    }

    //method called in the html to start the drawing of a new "Volglijn"
    public drawNewLine() {
        var mousex;
        var mousey;
        this.lineBool = true;
        this.removeCanvasListeners();
        this.initializeCircles();
        this.drawCircles();
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
            this.redraw();
            this.drawLine();
            this.drawBezierDistance(e.clientX - this.canvas.offsetLeft, e.clientY - this.canvas.offsetTop);
        })
    }

    private drawCircles() {
        for (var i = 0; i < this.arcx.length; i++) {
            this.context.beginPath();
            this.context.arc(this.arcx[i], this.arcy[i], this.radius, 0, 2 * Math.PI, false);
            this.context.fillStyle = "red";
            this.context.fill();
            this.context.closePath();
        }
    }

    private initializeCircles() {
        this.context = this.canvas.getContext("2d");
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.arcx.length < 4) {
            for (var i = 0; i < 4; i++) {
                this.arcx.push((this.canvas.width / 2) + (i * 10));
                this.arcy.push((this.canvas.height / 2) + (i * 10));
                this.drawOk.push(false);
            }
        }
    }

    private redraw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.arcx.forEach((circle, i) => {
            this.context.beginPath();
            this.context.arc(this.arcx[i], this.arcy[i], this.radius, 0, 2 * Math.PI, false);
            this.context.fillStyle = "red";
            this.context.fill();
        })
    }

    private drawLine() {
        this.context.beginPath();
        this.context.moveTo(this.arcx[0], this.arcy[0]);
        this.context.bezierCurveTo(this.arcx[1], this.arcy[1], this.arcx[2], this.arcy[2], this.arcx[3], this.arcy[3]);
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'blue';
        this.context.stroke();
        this.context.closePath();
    }

    private removeCanvasListeners() {
        console.log("removeCanvasListener");
        this.canvas.removeEventListener("mousemove");
        this.canvas.removeEventListener("mousedown");
        this.canvas.removeEventListener("mouseup");
        this.recreateNode(this.canvas, false)
    }

    //clone the canvas to remove the eventListeners
    private recreateNode(el, withChildren) {
        if (withChildren) {
            el.parentNode.replaceChild(el.cloneNode(true), el);
        } else {
            var newEl = el.cloneNode(false);
            while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
            el.parentNode.replaceChild(newEl, el);
            this.canvas = newEl;
        }
    }

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
} 