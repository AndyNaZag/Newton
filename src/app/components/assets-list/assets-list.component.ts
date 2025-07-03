import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faHandHoldingDollar, faTrash } from '@fortawesome/free-solid-svg-icons';
import { listAnimation } from '../../shared/animations/list-animation';
import { slideInAnimation, slideOutAnimation } from '../../shared/animations/slide-animation';
import { Asset } from '../../shared/models/asset.model';

@Component({
  selector: 'nw-assets-list',
  imports: [CurrencyPipe, FaIconComponent],
  templateUrl: './assets-list.component.html',
  styleUrl: './assets-list.component.scss',
  animations: [slideInAnimation, slideOutAnimation, listAnimation],
})
export class AssetsListComponent {
  assets = input<Asset[]>([]);
  totalValue = input<number>(0);
  removeAsset = output<number>();
  onAddAsset = output<void>();

  assetsIcon = faHandHoldingDollar;
  deleteIcon = faTrash;
}
