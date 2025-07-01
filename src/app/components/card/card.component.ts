import { Component, input, output } from '@angular/core';
import { FaIconComponent, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'nw-card',
  imports: [FaIconComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  title = input('');
  description = input('');
  ctaLabel = input('');
  icon = input<IconDefinition>(faHandHoldingDollar);
  onCtaClick = output<void>();
}
