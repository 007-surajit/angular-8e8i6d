import { Component, Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';

@Injectable()
export class FiveDayRangeSelectionStrategy<D>
  implements MatDateRangeSelectionStrategy<D>
{
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createWeekRange(activeDate);
  }

  private _createWeekRange(date: D | null): DateRange<D> {
    let currentDate: Moment | Date;

    if (date) {
      currentDate = date as unknown as Moment;
      currentDate = currentDate.startOf('week');

      const start = this._dateAdapter.addCalendarDays(
        currentDate as unknown as D,
        0
      );
      const end = this._dateAdapter.addCalendarDays(
        currentDate as unknown as D,
        6
      );
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, 0);
      const end = this._dateAdapter.addCalendarDays(date, 6);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}

/** @title Date range picker with custom a selection strategy */
@Component({
  selector: 'date-range-picker-selection-strategy-example',
  templateUrl: 'date-range-picker-selection-strategy-example.html',
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    },
  ],
})
export class DateRangePickerSelectionStrategyExample {}

/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
