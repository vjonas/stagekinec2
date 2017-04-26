import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'exercise',
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.css']
})

export class ExerciseComponent {

    teller: number[][] = [[0, 2, 3], [1, 3, 4, 5], [2, 6]];
    newExerciseSteps: number[] = [0];
    isCheckboxChecked: number = 0;
    viewState: boolean = true;
    lineBool: boolean = false;
    clearer: any;

    constructor(private router: Router) {
    }


    changeCheckbox(checkbox: any) {
        if (checkbox.currentTarget.childNodes[1].checked == false) {
            checkbox.currentTarget.childNodes[1].checked = true;
            this.isCheckboxChecked++;
        }
        else {
            checkbox.currentTarget.childNodes[1].checked = false
            this.isCheckboxChecked--;
        }
    }

    changeMode() {
        //change the mode of the exercise component
        if (this.viewState) {
            this.viewState = false;
            this.teller[this.teller.length] = [9, 8, 7];
        }
        else {
            this.viewState = true;
            //herinitialiseren new exercise
            this.newExerciseSteps = [0];
            this.teller.splice(this.teller.length-1, 1);
        }
    }

    addStep() {
        //add new step to the exercise
        this.newExerciseSteps[this.newExerciseSteps.length] = 1;
        console.log(this.newExerciseSteps);
    }

    newTouchPoint() {
        clearInterval(this.clearer);
        this.lineBool = false;
        /*this.clearer= $.getScript("./src/app/components/exercises/exercise.component/js/touchPointScript.js");*/
        var canvas;
        var ctx;
        var x = 75;
        var y = 50;
        var WIDTH = 960;
        var HEIGHT = 540;
        var dragok = false;

        function rect(x, y, w, h) {
            ctx.beginPath();
            ctx.rect(x, y, w, h);
            ctx.closePath();
            ctx.fill();
        }

        function clear() {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
        }

        function init() {
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");
            WIDTH = canvas.getAttribute("width");
            console.log(WIDTH);
            HEIGHT = canvas.getAttribute("height");
            return setInterval(draw, 10);
        }

        function draw() {
            clear();
            /*ctx.fillStyle = "#FAF7F8";
            rect(0,0,WIDTH,HEIGHT);*/
            ctx.fillStyle = "#FF0F00";
            rect(x - 15, y - 15, 30, 30);

        }

        function myMove(e) {
            if (dragok) {
                x = e.pageX - 30 - canvas.offsetLeft;
                $("#xcor").val(x - 15);
                y = e.pageY - 70 - canvas.offsetTop;
                $("#ycor").val(y - 15);

            }

        }

        function myDown(e) {
            if (e.pageX - 30 < x + 15 + canvas.offsetLeft && e.pageX - 30 > x - 15 +
                canvas.offsetLeft && e.pageY - 70 < y + 15 + canvas.offsetTop &&
                e.pageY - 70 > y - 15 + canvas.offsetTop) {
                x = e.pageX - 30 - canvas.offsetLeft;
                y = e.pageY - 70 - canvas.offsetTop;
                dragok = true;
                canvas.onmousemove = myMove;
            }
        }

        function myUp() {
            dragok = false;
            canvas.onmousemove = null;
        }

        this.clearer = init();
        canvas.onmousedown = myDown;
        canvas.onmouseup = myUp;
    }

    newLine() {
        clearInterval(this.clearer);
        this.lineBool = true;
        /*this.clearer = $.getScript("./src/app/components/exercises/exercise.component/js/lineScript.js");*/
        var canvas;
        var ctx;
        var x = 75;
        var y = 50;
        var x2 = 400;
        var y2 = 300;
        var xline1 = x;
        var yline1 = y;
        var xline2 = x2;
        var yline2 = y2;
        var WIDTH = 960;
        var HEIGHT = 540;
        var dragok = false;
        var dragok2 = false;

        function rect(x, y, w, h) {
            ctx.beginPath();
            ctx.rect(x, y, w, h);
            ctx.closePath();
            ctx.fill();
        }

        function line(x, y, x2, y2) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.stroke();
        }

        function clear() {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
        }

        function init() {
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");
            return setInterval(draw, 10);
        }

        function draw() {
            clear();
            /*ctx.fillStyle = "#FAF7F8";
            rect(0,0,WIDTH,HEIGHT);*/
            ctx.fillStyle = "#FF0F00";
            line(x, y, x2, y2);
            rect(x - 15, y - 15, 30, 30);
            ctx.fillStyle = "#00E823"
            rect(x2 - 15, y2 - 15, 30, 30);


        }

        function myMove(e) {
            if (dragok) {
                x = e.pageX - 30 - canvas.offsetLeft;
                xline1 = x;
                $("#xcor").val(x - 15);
                y = e.pageY - 70 - canvas.offsetTop;
                yline1 = y;
                $("#ycor").val(y - 15);

            }
            if (dragok2) {

                x2 = e.pageX - 30 - canvas.offsetLeft;
                xline2 = x2
                $("#x2cor").val(x2 - 15);
                y2 = e.pageY - 70 - canvas.offsetTop;
                yline2 = y2;
                $("#y2cor").val(y2 - 15);

            }
        }

        function myDown(e) {
            if (e.pageX - 30 < x + 15 + canvas.offsetLeft && e.pageX - 30 > x - 15 +
                canvas.offsetLeft && e.pageY - 70 < y + 15 + canvas.offsetTop &&
                e.pageY - 70 > y - 15 + canvas.offsetTop) {
                x = e.pageX - 30 - canvas.offsetLeft;
                y = e.pageY - 70 - canvas.offsetTop;
                dragok = true;
                canvas.onmousemove = myMove;
            }
            if (e.pageX - 30 < x2 + 15 + canvas.offsetLeft && e.pageX - 30 > x2 - 15 +
                canvas.offsetLeft && e.pageY - 70 < y2 + 15 + canvas.offsetTop &&
                e.pageY - 70 > y2 - 15 + canvas.offsetTop) {
                x2 = e.pageX - 30 - canvas.offsetLeft;
                y2 = e.pageY - 70 - canvas.offsetTop;
                dragok2 = true;
                canvas.onmousemove = myMove;
            }
        }

        function myUp() {
            dragok = false;
            dragok2 = false;
            canvas.onmousemove = null;
            clearInterval(this.clearer);
        }

        this.clearer = init();
        canvas.onmousedown = myDown;
        canvas.onmouseup = myUp;
    }
} 