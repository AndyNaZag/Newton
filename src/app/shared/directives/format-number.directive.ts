import { Directive, ElementRef, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[nwFormatNumber]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormatNumberDirective),
      multi: true,
    },
  ],
})
export class FormatNumberDirective implements ControlValueAccessor {
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(private el: ElementRef<HTMLInputElement>) {}

  writeValue(value: any): void {
    const formatted = this.formatValue(value);
    this.el.nativeElement.value = formatted;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event.target.value'])
  onInput(rawValue: string): void {
    const numeric = this.parseValue(rawValue);
    this.onChange(numeric);
  }

  @HostListener('blur')
  onBlur(): void {
    const rawValue = this.el.nativeElement.value;
    const numeric = this.parseValue(rawValue);
    const formatted = this.formatValue(numeric);
    this.el.nativeElement.value = formatted;
    this.onTouched();
  }

  private formatValue(value: any): string {
    if (value === null || value === undefined || isNaN(value)) return '';
    return parseFloat(value)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  private parseValue(value: string): number {
    return parseFloat(value.replace(/,/g, '')) || 0;
  }
}
