import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { listAnimation } from '../../shared/animations/list-animation';
import { slideInAnimation, slideOutAnimation } from '../../shared/animations/slide-animation';
import { FormatNumberDirective } from '../../shared/directives/format-number.directive';
import { AssetTypes } from '../../shared/enums/assets-type.enum';
import { AssetsStore } from '../../stores/assets.store';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'nw-assets-form',
  imports: [FormatNumberDirective, ReactiveFormsModule, FaIconComponent, DropdownComponent],
  templateUrl: './assets-form.component.html',
  styleUrl: './assets-form.component.scss',
  animations: [slideInAnimation, slideOutAnimation, listAnimation],
})
export class AssetsFormComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  assetsStore = inject(AssetsStore);
  form!: FormGroup;
  assetTypes = Object.values(AssetTypes).filter((type) => type !== AssetTypes.None);
  isDisabled = computed(() => this.assetsStore.assets().length <= 1);

  private readonly subscription = new Subscription();

  addIcon = faPlusCircle;
  deleteIcon = faTrash;

  private readonly initialAssets = [...this.assetsStore.assets()];

  ngOnInit(): void {
    this.form = this.fb.group({
      assets: this.fb.array(
        this.initialAssets.length > 0
          ? this.initialAssets.map((asset) => this.createAssetGroupFromData(asset))
          : [this.createAssetGroup()]
      ),
    });

    this.onFormChanged();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get assets(): FormArray {
    return this.form.get('assets') as FormArray;
  }

  createAssetGroup(): FormGroup {
    return this.fb.group({
      id: this.fb.control(crypto.randomUUID()),
      type: ['', Validators.required],
      value: [null, [Validators.required, Validators.min(0)]],
    });
  }

  createAssetGroupFromData(asset: any): FormGroup {
    return this.fb.group({
      id: this.fb.control(asset.id ?? crypto.randomUUID()),
      type: [asset.type || '', Validators.required],
      value: [asset.value || null, [Validators.required, Validators.min(0)]],
    });
  }

  addAsset(): void {
    this.assets.push(this.createAssetGroup());
  }

  removeAsset(index: number): void {
    if (this.assets.length > 1) {
      this.assets.removeAt(index);
    }
  }

  onFormChanged(): void {
    this.subscription.add(
      this.form.valueChanges.subscribe((value) => {
        this.assetsStore.updateAssets(value.assets);
        if (this.form.valid) {
          this.assetsStore.updateHasError(false);
        } else {
          this.assetsStore.updateHasError(true);
        }
      })
    );
  }
}
