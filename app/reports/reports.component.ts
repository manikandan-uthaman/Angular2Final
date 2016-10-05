import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../login/auth-user.component'


@Component({
   template: '<h1>Reports</h1>'
})
export class ReportsComponent implements OnInit{
    constructor(private _router: Router, private _auth: AuthService){
    }

    ngOnInit(){
        // if(!this._auth.getValue())
        //     this._router.navigate(['login']);
    }
}