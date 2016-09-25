import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'nav-bar',
    templateUrl: '/app/shared/nav-bar.component.html'
})
export class NavbarComponent{
    constructor(private _router: Router){

    }

    isActive(url){
        return this._router.isActive(url, true);
    }
}