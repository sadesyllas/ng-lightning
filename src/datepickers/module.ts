import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NglIconsModule} from '../icons/module';

import {NglDatepicker} from './datepicker';

import {NglDatepickerWeekdays} from './weekdays';
import {NglDay} from './day';
import {NglDatepickerYear} from './year';

@NgModule({
  declarations: [NglDatepicker, NglDay, NglDatepickerWeekdays, NglDatepickerYear],
  exports: [NglDatepicker],
  imports: [CommonModule, FormsModule, NglIconsModule],
})
export class NglDatepickersModule {}
