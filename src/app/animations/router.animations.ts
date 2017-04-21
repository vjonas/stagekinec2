import {trigger, state, animate, style, transition} from '@angular/core';

export function routerTransition(){
    return slideToLeft();
}

function slideToLeft(){
    return trigger('routerTransition', [
        state('void', style({position: 'fixed', width: '100%'})),
        state('*', style ({position: 'fixed', width:'100%'})),
        transition(':enter', [
            style({opacity:'0'}),
            animate('0.2s ease-in-out', style({opacity:'1'}))
        ]),
        transition(':leave', [
            style({transform: 'scale(1.0)'}),
            animate('0.2 ease-in-out', style({transform: 'scale(0.0)', opacity:'0'}))
        ])
    ])
}