import { Component, Input, Output, OnChanges, EventEmitter, AfterContentChecked } from "@angular/core";
import { FullExercise } from "../../../models/full.exercise.model";
import Chart from 'chart.js'

@Component({
    selector: 'exerciseUser',
    templateUrl: 'user-exercise.component.html',
    styleUrls: ['./user-exercise.component.scss'],
})

export class UserExerciseComponent implements OnChanges {
    @Input() exercise: FullExercise = null;
    @Output() notify: EventEmitter<String> = new EventEmitter<String>();
    showComponent: boolean = false;


    ngOnChanges(changes) {
        console.log(changes);
        if (changes.exercise.currentValue != null) {
            this.showComponent = true;
            console.log(changes.exercise.currentValue);
        }
    }

    goBack() {
        this.showComponent = false;
        this.notify.emit("");
    }
}

