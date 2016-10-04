import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../login/auth-user.component'

@Component({
   template: '<h1>Page not found!</h1>'
})
export class NotFoundComponent{
    constructor(private _router: Router, private _auth: AuthService){
    }

    ngOnInit(){
        if(!this._auth.getValue())
            this._router.navigate(['login']);
    }
    
}