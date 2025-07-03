import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../shared/models/asset.model';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  getAssets(): Observable<Asset[]> {
    const assetsJson = localStorage.getItem('assets');
    const assets: Asset[] = assetsJson ? JSON.parse(assetsJson) : [];
    return new Observable<Asset[]>((observer) => {
      observer.next(assets);
      observer.complete();
    });
  }

  saveAssets(assets: Asset[]): Observable<void> {
    localStorage.setItem('assets', JSON.stringify(assets));
    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
