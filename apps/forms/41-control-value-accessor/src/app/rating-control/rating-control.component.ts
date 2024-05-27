import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-rating-control',
  templateUrl: 'rating-control.component.html',
  styleUrls: ['rating-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingControlComponent),
      multi: true,
    },
  ],
})
export class RatingControlComponent implements ControlValueAccessor {
  value: number | null = null;
  isDisabled = false;

  private _onChange?: (value: number) => void;
  private _onTouch?: () => void;

  writeValue(value: number): void {
    this.value = value;
    if (this._onChange) {
      this._onChange(value);
    }
  }

  registerOnChange(fn: (value: number) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  setRating(index: number): void {
    if (this.isDisabled) {
      return;
    }
    this.value = index + 1;
    this.writeValue(this.value);
  }

  isStarActive(index: number, value: number | null): boolean {
    return value ? index < value : false;
  }
}
