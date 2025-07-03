import { TestBed } from '@angular/core/testing';

import { AssetTypes } from '../shared/enums/assets-type.enum';
import { Asset } from '../shared/models/asset.model';
import { AssetsService } from './assets.service';

describe('AssetsService', () => {
  let service: AssetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetsService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAssets', () => {
    it('should return an empty array if no assets are stored in localStorage', (done) => {
      service.getAssets().subscribe((assets) => {
        expect(assets).toEqual([]);
        done();
      });
    });

    it('should return assets from localStorage', (done) => {
      const mockAssets: Asset[] = [{ id: '1', type: AssetTypes.Other, value: 100 }];
      localStorage.setItem('assets', JSON.stringify(mockAssets));

      service.getAssets().subscribe((assets) => {
        expect(assets).toEqual(mockAssets);
        done();
      });
    });
  });

  describe('saveAssets', () => {
    it('should save assets to localStorage', (done) => {
      const mockAssets: Asset[] = [{ id: '1', type: AssetTypes.Other, value: 100 }];

      service.saveAssets(mockAssets).subscribe(() => {
        const storedAssets = JSON.parse(localStorage.getItem('assets') || '[]');
        expect(storedAssets).toEqual(mockAssets);
        done();
      });
    });

    it('should complete the observable after saving assets', (done) => {
      const mockAssets: Asset[] = [{ id: '1', type: AssetTypes.Other, value: 100 }];

      service.saveAssets(mockAssets).subscribe({
        complete: () => {
          expect(true).toBeTrue(); // Observable completed
          done();
        },
      });
    });
  });
});
