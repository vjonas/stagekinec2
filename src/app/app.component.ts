import { Component, OnInit, AfterContentInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  
  title = 'app works!'; 

  constructor(){
};

ngAfterContentInit(){
  // $.getScript('../index.js', function(){});

}




}


