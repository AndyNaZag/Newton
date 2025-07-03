import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssetTypes } from '../../shared/enums/assets-type.enum';
import { AssetsListComponent } from './assets-list.component';

describe('AssetsListComponent', () => {
  let component: AssetsListComponent;
  let fixture: ComponentFixture<AssetsListComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsListComponent, FontAwesomeModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AssetsListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.componentRef.setInput('assets', [
      { id: '1', type: AssetTypes.Gift, value: 1000 },
      { id: '2', type: AssetTypes.Other, value: 500 },
    ]);
    fixture.componentRef.setInput('totalValue', 1500);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct number of assets', () => {
    const assetItems = debugElement.queryAll(By.css('.assets-list__item'));
    expect(assetItems.length).toBe(3);
  });

  it('should display asset details correctly', () => {
    const assetItems = debugElement.queryAll(By.css('.assets-list__item'));
    expect(assetItems[0].nativeElement.textContent).toContain('Gift');
    expect(assetItems[0].nativeElement.textContent).toContain('$1,000.00');
    expect(assetItems[1].nativeElement.textContent).toContain('Other');
    expect(assetItems[1].nativeElement.textContent).toContain('$500.00');
  });

  it('should display the total value correctly', () => {
    const totalValueItem = debugElement.query(By.css('.assets-list__item:last-child'));
    expect(totalValueItem.nativeElement.textContent).toContain('TOTAL VALUE');
    expect(totalValueItem.nativeElement.textContent).toContain('$1,500.00');
  });

  it('should emit removeAsset event when delete button is clicked', () => {
    spyOn(component.removeAsset, 'emit');
    const deleteButtons = debugElement.queryAll(By.css('.assets-list__delete-btn'));
    deleteButtons[0].triggerEventHandler('click', null);
    expect(component.removeAsset.emit).toHaveBeenCalledWith(0);
  });

  it('should emit onAddAsset event when Add Assets button is clicked', () => {
    spyOn(component.onAddAsset, 'emit');
    const addButton = debugElement.query(By.css('.btn-outline-success'));
    addButton.triggerEventHandler('click', null);
    expect(component.onAddAsset.emit).toHaveBeenCalled();
  });
});
