import { NgFor } from '@angular/common';
import { Component, forwardRef, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nw-dropdown',
  imports: [NgFor, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu, NgbDropdownItem],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  options = input<string[]>([]);
  error = input<boolean>(false);
  selectedOption = model<string>('');

  selectOption(value: string) {
    this.selectedOption.set(value);
    this.onChange(value);
    this.onTouched();
  }

  //#region ControlValueAccessor Implementation
  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.selectedOption.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  //#endregion
}
