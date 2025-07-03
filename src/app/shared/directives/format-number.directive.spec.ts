import { ElementRef } from '@angular/core';
import { FormatNumberDirective } from './format-number.directive';

describe('FormatNumberDirective', () => {
  let directive: FormatNumberDirective;
  let mockElementRef: ElementRef<HTMLInputElement>;

  beforeEach(() => {
    mockElementRef = {
      nativeElement: document.createElement('input'),
    } as ElementRef<HTMLInputElement>;
    directive = new FormatNumberDirective(mockElementRef);
  });

  it('should format the value correctly when writeValue is called', () => {
    directive.writeValue(12345.678);
    expect(mockElementRef.nativeElement.value).toBe('12,345.68');
  });

  it('should parse the value correctly when onInput is triggered', () => {
    mockElementRef.nativeElement.value = '12,345.68';
    directive.onInput(mockElementRef.nativeElement.value);

    expect(directive['parseValue'](mockElementRef.nativeElement.value)).toBe(12345.68);
  });

  it('should format the value correctly when onBlur is triggered', () => {
    mockElementRef.nativeElement.value = '12345.678';
    directive.onBlur();
    expect(mockElementRef.nativeElement.value).toBe('12,345.68');
  });

  it('should return an empty string for invalid values in formatValue', () => {
    expect(directive['formatValue'](null)).toBe('');
    expect(directive['formatValue'](undefined)).toBe('');
    expect(directive['formatValue']('invalid')).toBe('');
  });

  it('should parse the value correctly in parseValue', () => {
    expect(directive['parseValue']('12,345.68')).toBe(12345.68);
    expect(directive['parseValue']('invalid')).toBe(0);
  });

  it('should register onChange and onTouched callbacks', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    const onTouchedSpy = jasmine.createSpy('onTouched');

    directive.registerOnChange(onChangeSpy);
    directive.registerOnTouched(onTouchedSpy);

    mockElementRef.nativeElement.value = '123';
    directive.onInput(mockElementRef.nativeElement.value);

    directive.onBlur();

    expect(onChangeSpy).toHaveBeenCalledWith(123);
    expect(onTouchedSpy).toHaveBeenCalled();
  });
});
