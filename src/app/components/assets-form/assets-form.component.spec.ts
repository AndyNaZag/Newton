import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormatNumberDirective } from '../../shared/directives/format-number.directive';
import { AssetTypes } from '../../shared/enums/assets-type.enum';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { AssetsFormComponent } from './assets-form.component';

class MockAssetsStore {
  assets = () => [];
  updateAssets = jasmine.createSpy('updateAssets');
  updateHasError = jasmine.createSpy('updateHasError');
  savePressed = () => false;
}

describe('AssetsFormComponent', () => {
  let fixture: ComponentFixture<AssetsFormComponent>;
  let component: AssetsFormComponent;
  let store: MockAssetsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FontAwesomeModule,
        AssetsFormComponent,
        FormatNumberDirective,
        DropdownComponent,
        FaIconComponent,
        NoopAnimationsModule,
      ],
      declarations: [],
      providers: [{ provide: 'AssetsStore', useClass: MockAssetsStore }],
    });

    store = new MockAssetsStore();
    TestBed.overrideComponent(AssetsFormComponent, {
      set: {
        providers: [{ provide: 'AssetsStore', useValue: store }],
      },
    });

    fixture = TestBed.createComponent(AssetsFormComponent);
    component = fixture.componentInstance;
    component['assetsStore'] = store as any;
  });

  it('should create the form with one asset if store is empty', () => {
    fixture.detectChanges();
    expect(component.assets.length).toBe(1);
    expect(component.assets.at(0).get('type')).toBeTruthy();
    expect(component.assets.at(0).get('value')).toBeTruthy();
  });

  it('should add a new asset', () => {
    fixture.detectChanges();
    const initialCount = component.assets.length;
    component.addAsset();
    expect(component.assets.length).toBe(initialCount + 1);
  });

  it('should remove an asset if more than one exists', () => {
    fixture.detectChanges();
    component.addAsset();
    const secondId = component.assets.at(1).get('id')?.value;

    component.removeAsset(1);
    expect(component.assets.length).toBe(1);
    expect(component.assets.at(0).get('id')?.value).not.toBe(secondId);
  });

  it('should not remove asset if only one remains', () => {
    fixture.detectChanges();
    const initialId = component.assets.at(0).get('id')?.value;

    component.removeAsset(0);
    expect(component.assets.length).toBe(1);
    expect(component.assets.at(0).get('id')?.value).toBe(initialId);
  });

  it('should update store on form value change', () => {
    fixture.detectChanges();
    component.assets.at(0).get('value')?.setValue(9999);

    expect(store.updateAssets).toHaveBeenCalled();
  });

  it('should set hasError true when form is invalid', () => {
    fixture.detectChanges();
    component.assets.at(0).get('value')?.setValue(null);

    component.form.updateValueAndValidity();
    expect(store.updateHasError).toHaveBeenCalledWith(true);
  });

  it('should set hasError false when form is valid', () => {
    fixture.detectChanges();
    component.assets.at(0).get('type')?.setValue(AssetTypes.Other);
    component.assets.at(0).get('value')?.setValue(5000);

    component.form.updateValueAndValidity();
    expect(store.updateHasError).toHaveBeenCalledWith(false);
  });
});
