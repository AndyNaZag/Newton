import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { Type } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let activeModalMock: NgbActiveModal;

  beforeEach(async () => {
    activeModalMock = jasmine.createSpyObj('NgbActiveModal', ['close']);

    await TestBed.configureTestingModule({
      imports: [ModalComponent, FontAwesomeModule, CommonModule],
      providers: [{ provide: NgbActiveModal, useClass: MockActiveModal }],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onCtaButtonClick when ctaButtonClick is called', () => {
    spyOn(component.onCtaButtonClick, 'emit');
    component.ctaButtonClick();
    expect(component.onCtaButtonClick.emit).toHaveBeenCalled();
  });

  it('should emit onCloseButtonClick when closeButtonClick is called', () => {
    spyOn(component.onCloseButtonClick, 'emit');
    component.closeButtonClick();
    expect(component.onCloseButtonClick.emit).toHaveBeenCalled();
  });

  it('should have default values for inputs', () => {
    expect(component.title).toBe('');
    expect(component.icon).toBeDefined();
  });

  it('should accept contentComponent input', () => {
    const mockComponent: Type<unknown> = class {};
    component.contentComponent = mockComponent;
    expect(component.contentComponent).toBe(mockComponent);
  });
});

class MockActiveModal {
  close = jasmine.createSpy('close');
  dismiss = jasmine.createSpy('dismiss');
}
