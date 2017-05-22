import { Injectable } from '@angular/core';
import { FullExercise } from '../models/full.exercise.model';
import Bezier from 'bezier-js';

@Injectable()
export class DrawService {

    drawTrackingLine(canvas: HTMLCanvasElement, newExercise: FullExercise, activeStepToDraw: number) {
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.moveTo(newExercise.steps[activeStepToDraw].x0, newExercise.steps[activeStepToDraw].y0);
        context.bezierCurveTo(newExercise.steps[activeStepToDraw].x1, newExercise.steps[activeStepToDraw].y1, newExercise.steps[activeStepToDraw].x2, newExercise.steps[activeStepToDraw].y2, newExercise.steps[activeStepToDraw].x3, newExercise.steps[activeStepToDraw].y3);
        context.lineWidth = 2;
        context.strokeStyle = 'rgba(0,0,255,0.3)';
        context.stroke();
        context.closePath();
        for (var i = 0; i < 4; i++) {
            context.beginPath();
            context.arc(newExercise.steps[activeStepToDraw]["x" + i], newExercise.steps[activeStepToDraw]["y" + i], newExercise.steps[activeStepToDraw].radius, 0, 2 * Math.PI, false);
            if (i == 0) {
                context.fillStyle = "green";
            }
            else if (i < 3) {
                context.fillStyle = "blue";
            } else {
                context.fillStyle = "red";
            }
            context.fill();
            context.closePath();
        }
        this.drawOffsetOfTrackingLine(context, newExercise, activeStepToDraw);
    }

    drawOffsetOfTrackingLine(context: CanvasRenderingContext2D, newExercise: FullExercise, activeStepToDraw: number) {
        var offsetLeft = new Bezier(newExercise.steps[activeStepToDraw].x0, newExercise.steps[activeStepToDraw].y0, newExercise.steps[activeStepToDraw].x1, newExercise.steps[activeStepToDraw].y1, newExercise.steps[activeStepToDraw].x2, newExercise.steps[activeStepToDraw].y2, newExercise.steps[activeStepToDraw].x3, newExercise.steps[activeStepToDraw].y3).offset(newExercise.steps[activeStepToDraw].trackingLineOffset);
        var offsetRight = new Bezier(newExercise.steps[activeStepToDraw].x0, newExercise.steps[activeStepToDraw].y0, newExercise.steps[activeStepToDraw].x1, newExercise.steps[activeStepToDraw].y1, newExercise.steps[activeStepToDraw].x2, newExercise.steps[activeStepToDraw].y2, newExercise.steps[activeStepToDraw].x3, newExercise.steps[activeStepToDraw].y3).offset(-newExercise.steps[activeStepToDraw].trackingLineOffset);
        context.beginPath();
        context.moveTo(offsetLeft[0].points[0].x, offsetLeft[0].points[0].y);
        for (var i = 0; i < Object.keys(offsetLeft).length; i++) {
            context.strokeStyle = "red";
            context.bezierCurveTo(offsetLeft[i].points[1].x, offsetLeft[i].points[1].y, offsetLeft[i].points[2].x, offsetLeft[i].points[2].y, offsetLeft[i].points[3].x, offsetLeft[i].points[3].y);
            context.stroke();
        }
        context.moveTo(offsetRight[0].points[0].x, offsetRight[0].points[0].y);
        for (var i = 0; i < Object.keys(offsetRight).length; i++) {
            context.strokeStyle = "red";
            context.bezierCurveTo(offsetRight[i].points[1].x, offsetRight[i].points[1].y, offsetRight[i].points[2].x, offsetRight[i].points[2].y, offsetRight[i].points[3].x, offsetRight[i].points[3].y);
            context.stroke();
        }
        context.closePath();
    }

    drawBezierDistance(mouseX: number, mouseY: number, canvas: HTMLCanvasElement, newExercise: FullExercise, activeStepToDraw: number) {
        var context = canvas.getContext("2d");
        var curve: Bezier = new Bezier(newExercise.steps[activeStepToDraw].x0, newExercise.steps[activeStepToDraw].y0, newExercise.steps[activeStepToDraw].x1, newExercise.steps[activeStepToDraw].y1, newExercise.steps[activeStepToDraw].x2, newExercise.steps[activeStepToDraw].y2, newExercise.steps[activeStepToDraw].x3, newExercise.steps[activeStepToDraw].y3);
        var mouse = { x: mouseX, y: mouseY };
        var p = curve.project(mouse);

        context.beginPath();
        context.moveTo(mouseX, mouseY);
        context.lineTo(p.x, p.y);
        context.lineWidth = 2;
        context.strokeStyle = 'blue';
        context.stroke();
        context.closePath();
    }

    drawTouchPoints(canvas: HTMLCanvasElement, newExercise: FullExercise, activeStepToDraw: number) {
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(newExercise.steps[activeStepToDraw].x0, newExercise.steps[activeStepToDraw].y0, newExercise.steps[activeStepToDraw].radius, 0, 2 * Math.PI, false);
        context.fillStyle = "green";
        context.fill();
        context.closePath();
        if (newExercise.steps[activeStepToDraw].stepType == 2) {
            context.beginPath();
            context.arc(newExercise.steps[activeStepToDraw].x1, newExercise.steps[activeStepToDraw].y1, newExercise.steps[activeStepToDraw].radius, 0, 2 * Math.PI, false);
            context.fillStyle = "red";
            context.fill();
            context.closePath();
        }
    }

    recreateCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
        var newEl = canvas.cloneNode(false);
        while (canvas.hasChildNodes()) newEl.appendChild(canvas.firstChild);
        canvas.parentNode.replaceChild(newEl, canvas);
        canvas = <HTMLCanvasElement>newEl;
        return canvas.getContext('2d');
    }
}