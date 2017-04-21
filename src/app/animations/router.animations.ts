import {trigger, state, animate, style, transition} from '@angular/core';

export function routerTransition(){
    return fade();
}

function fade(){
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

export function slideRightTransition(){
    return slideToRight();
}

function slideToRight(){
    return trigger('routerTransition', [
        state('void', style({position: 'fixed', width: '100%'})),
        state('*', style ({position: 'fixed', width:'100%'})),
        transition(':enter', [
            style({transform:'translateX(-100%)'}),
            animate('0.3s ease-in-out', style({transform: 'translateX(0%)'}))
        ]),
        transition(':leave', [
            style({transform: 'transform(0%)'}),
            animate('0.3 ease-in-out', style({transform: 'translate(-100%)'}))
        ])
    ]);
}

export function slideLeftTransition(){
    return slideToLeft();
}

function slideToLeft(){
    return trigger('routerTransition', [
        state('void', style({position: 'fixed', width: '100%'})),
        state('*', style ({position: 'fixed', width:'100%'})),
        transition(':enter', [
            style({transform:'translateX(100%)'}),
            animate('0.3s ease-in-out', style({transform: 'translateX(0%)'}))
        ]),
        transition(':leave', [
            style({transform: 'transform(0%)'}),
            animate('0.3 ease-in-out', style({transform: 'translate(-100%)'}))
        ])
    ]);
}