import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { Kinect2 } from 'electron-kinect2';

@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, OnChanges {
  //  kinect : Kinect2;

    ngOnInit() { 
       // this.kinect = new Kinect2();
    }

    ngOnChanges(changes){
        console.log(changes);
    }

  


}