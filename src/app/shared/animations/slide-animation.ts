import { animate, style, transition, trigger } from '@angular/animations';

export const slideInAnimation = trigger('slideIn', [
  transition(':enter', [
    style({
      transform: 'translateY(-20px)',
      opacity: 0,
      height: '0px',
      overflow: 'hidden',
    }),
    animate(
      '300ms ease-out',
      style({
        transform: 'translateY(0)',
        opacity: 1,
        height: '*',
      })
    ),
  ]),
]);

export const slideOutAnimation = trigger('slideOut', [
  transition(':leave', [
    style({
      transform: 'translateY(0)',
      opacity: 1,
      height: '*',
    }),
    animate(
      '250ms ease-in',
      style({
        transform: 'translateY(-20px)',
        opacity: 0,
        height: '0px',
      })
    ),
  ]),
]);
