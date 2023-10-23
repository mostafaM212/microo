import { Component, OnInit } from '@angular/core';
import { easeOutTrigger } from 'src/app/animations/easeIn.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

  animations: [easeOutTrigger],
})
export class HomeComponent implements OnInit {
  state = 0;
  activeIndex = 0;
  messages: string[] = [
    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure',
    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure efefe',
    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure 1235478',
  ];
  activeMessage: string = this.messages[0];
  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.setActiveMessageAuto();
  }

  setActiveMessage(index: number) {
    this.activeMessage = this.messages[index];
    this.state = 1;
    this.activeIndex = index;

    setTimeout(() => {
      this.state = 0;
    }, 1200);
  }

  setActiveMessageAuto() {
    setInterval(() => {
      if (this.activeIndex == 0) {
        this.setActiveMessage(1);
      } else if (this.activeIndex == 1) {
        this.setActiveMessage(2);
      } else if (this.activeIndex == 2) {
        this.setActiveMessage(0);
      }
    }, 10000);
  }
}
