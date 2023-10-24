import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoDataComponent } from './no-data/no-data.component';

@NgModule({
  declarations: [NoDataComponent],
  exports: [NoDataComponent],
})
export class SharedModule {}
