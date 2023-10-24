import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
})
export class NoDataComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
}
