import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
} from '@angular/animations';

export let easeOutTrigger = trigger('easeOut', [
  state(
    '1',
    style({
      transform: 'translateX(500px)',
      opacity: '0',
    })
  ),
  state(
    '*',
    style({
      transform: 'translateX(0px)',
      opacity: '100%',
    })
  ),
  transition(
    '* => 1',
    animate(
      '1s',
      keyframes([
        style({ transform: 'translateX(0px)', opacity: '1', offset: 0 }),
        style({
          transform: 'translateX(100px)',
          opacity: '0.75',
          offset: 0.25,
        }),
        style({
          transform: 'translateX(200px)',
          opacity: '0.5',
          offset: 0.5,
        }),
        style({ transform: 'translateX(500px)', opacity: '0', offset: 1 }),
      ])
    )
  ),
  transition(
    '* => 0',
    animate(
      '1s',
      keyframes([
        style({ transform: 'translateX(-500px)', opacity: '1', offset: 0 }),
        style({
          transform: 'translateX(-300px)',
          opacity: '0.25',
          offset: 0.25,
        }),
        style({
          transform: 'translateX(-200px)',
          opacity: '0.5',
          offset: 0.5,
        }),
        style({
          transform: 'translateX(-100px)',
          opacity: '0,75',
          offset: 0.75,
        }),
        style({ transform: 'translateX(0px)', opacity: '0', offset: 1 }),
      ])
    )
  ),
  transition(
    '* => void',
    animate(
      '.5s',
      style({
        transform: 'translateX(500px)',
        opacity: '100%',
      })
    )
  ),
]);

export let easeInTrigger = trigger('easeIn', [
  state(
    'void',
    style({
      transform: 'translateX(-500px)',
      opacity: '0',
    })
  ),
  state(
    '*',
    style({
      transform: 'translateX(0px)',
      opacity: '100%',
    })
  ),
  transition(
    'void =>*',
    animate(
      '1s',
      keyframes([
        style({ transform: 'translateX(-500px)', opacity: '0', offset: 0 }),
        style({
          transform: 'translateX(-300px)',
          opacity: '0.25',
          offset: 0.25,
        }),
        style({
          transform: 'translateX(-100px)',
          opacity: '0.5',
          offset: 0.5,
        }),
        style({ transform: 'translateX(0px)', opacity: '1', offset: 1 }),
      ])
    )
  ),
  transition(
    '* => void',
    animate(
      '.5s',
      style({
        transform: 'translateX(500px)',
        opacity: '100%',
      })
    )
  ),
]);
