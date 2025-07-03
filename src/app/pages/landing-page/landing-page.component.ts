import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AssetsFormComponent } from '../../components/assets-form/assets-form.component';
import { AssetsListComponent } from '../../components/assets-list/assets-list.component';
import { CardComponent } from '../../components/card/card.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { AssetsService } from '../../services/assets.service';
import { AssetsStore } from '../../stores/assets.store';

@Component({
  selector: 'nw-landing-page',
  imports: [CardComponent, AssetsListComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit, OnDestroy {
  assetsStore = inject(AssetsStore);
  private readonly assetsService = inject(AssetsService);
  modalService = inject(NgbModal);

  modalRef!: NgbModalRef;
  subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.assetsService.getAssets().subscribe((assets) => {
        this.assetsStore.updateAssets(assets);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openAssetsModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      windowClass: 'modal-top',
      size: 'xl',
    });

    const modalComponent = this.modalRef.componentInstance as ModalComponent;
    modalComponent.title = 'Add Assets';
    modalComponent.contentComponent = AssetsFormComponent;

    this.subscription.add(
      modalComponent.onCtaButtonClick.subscribe(() => {
        this.saveAssets();
      })
    );

    modalComponent.onCloseButtonClick.subscribe(() => {
      this.getAssets();
    });
  }

  getAssets() {
    this.subscription.add(
      this.assetsService.getAssets().subscribe((assets) => {
        this.assetsStore.updateAssets(assets);
        this.assetsStore.updateHasError(false);
      })
    );
  }

  saveAssets() {
    this.assetsStore.updateSavePressed(true);
    if (this.assetsStore.hasError()) {
      alert('Form is invalid, cannot save assets.');
      return;
    }

    const assets = this.assetsStore.assets();
    this.subscription.add(
      this.assetsService.saveAssets(assets).subscribe(() => {
        this.modalRef?.close();
        this.assetsStore.updateSavePressed(false);
      })
    );
  }

  removeAsset(index: number) {
    this.assetsStore.removeAsset(index);
    this.saveAssets();
  }
}
