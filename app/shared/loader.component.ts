import {Component, Input} from '@angular/core';

Component({
    selector: 'loader',
    template:`
        <div class="hider"></div>
        <div class="popup_box">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
        </div>
    `
})
export class LoaderComponent{
    @Input() isloading;
}
