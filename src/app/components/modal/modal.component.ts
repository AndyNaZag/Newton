import { NgComponentOutlet } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, Type } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'nw-modal',
  imports: [NgComponentOutlet, FaIconComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  activeModal = inject(NgbActiveModal);

  @Input() title = '';
  @Input() icon = faHandHoldingDollar;
  @Input() contentComponent!: Type<unknown>;
  @Output() onCtaButtonClick = new EventEmitter<void>();
  @Output() onCloseButtonClick = new EventEmitter<void>();

  ctaButtonClick() {
    this.onCtaButtonClick.emit();
  }

  closeButtonClick() {
    this.onCloseButtonClick.emit();
    this.activeModal.close();
  }
}
