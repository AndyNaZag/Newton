import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Asset } from '../shared/models/asset.model';
import { AssetsFormState } from '../shared/models/assets-form-state.model';

const initialState: AssetsFormState = {
  assets: [],
  hasError: false,
  savePressed: false,
};
export const AssetsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateAssets(assets: Asset[]): void {
      patchState(store, { assets });
    },
    removeAsset(index: number): void {
      const currentAssets = store.assets();
      if (index >= 0 && index < currentAssets.length) {
        const updatedAssets = [...currentAssets];
        updatedAssets.splice(index, 1);
        patchState(store, { assets: updatedAssets });
      }
    },
    updateHasError(hasError: boolean): void {
      patchState(store, { hasError });
    },
    updateSavePressed(savePressed: boolean): void {
      patchState(store, { savePressed });
    },
    resetState(): void {
      patchState(store, initialState);
    },
  })),
  withComputed(({ assets }) => ({
    totalValue: computed(() => {
      return assets().reduce((total, asset) => total + (asset.value || 0), 0);
    }),
  }))
);
