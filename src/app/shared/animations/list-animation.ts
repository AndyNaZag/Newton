import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({
          transform: 'translateY(-20px)',
          opacity: 0,
          height: '0px',
        }),
        stagger('100ms', [
          animate(
            '300ms ease-out',
            style({
              transform: 'translateY(0)',
              opacity: 1,
              height: '*',
            })
          ),
        ]),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        stagger('100ms', [
          animate(
            '250ms ease-in',
            style({
              transform: 'translateY(-20px)',
              opacity: 0,
              height: '0px',
            })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);
