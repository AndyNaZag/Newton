import { AssetTypes } from '../enums/assets-type.enum';

export interface Asset {
  id: string;
  type: AssetTypes;
  value: number | null;
}
