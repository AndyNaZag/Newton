import { Asset } from './asset.model';

export interface AssetsFormState {
  assets: Asset[];
  hasError: boolean;
  savePressed: boolean;
}
