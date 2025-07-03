import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('options', ['Option 1', 'Option 2', 'Option 3']);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of options', () => {
    const dropdownItems = fixture.debugElement.queryAll(By.css('.dropdown-item'));
    expect(dropdownItems.length).toBe(3);
  });

  it('should update selectedOption when an option is selected', () => {
    spyOn(component, 'onChange');
    spyOn(component, 'onTouched');

    const dropdownItems = fixture.debugElement.queryAll(By.css('.dropdown-item'));
    dropdownItems[1].triggerEventHandler('click', null); // Select "Option 2"

    expect(component.selectedOption()).toBe('Option 2');
    expect(component.onChange).toHaveBeenCalledWith('Option 2');
    expect(component.onTouched).toHaveBeenCalled();
  });

  it('should write the value correctly using writeValue', () => {
    component.writeValue('Option 3');
    expect(component.selectedOption()).toBe('Option 3');
  });

  it('should register onChange and onTouched callbacks', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    const onTouchedSpy = jasmine.createSpy('onTouched');

    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchedSpy);

    component.selectOption('Option 1');

    expect(onChangeSpy).toHaveBeenCalledWith('Option 1');
    expect(onTouchedSpy).toHaveBeenCalled();
  });
});
