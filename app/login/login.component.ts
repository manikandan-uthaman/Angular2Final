import {Component} from '@angular/core';
import {AuthService} from '../login/auth-user.component'
import {Router} from '@angular/router'
import {FormGroup, FormControl} from '@angular/forms'

@Component({
    selector: 'login',
    templateUrl: '/app/login/login.component.html'
})
export class LoginComponent{
    loginForm;
    username;
    password;
    isRequired;
    constructor(private _auth: AuthService, private _router: Router){
        this.loginForm = new FormGroup({
            username: new FormControl(''),
            password: new FormControl('')
        });
    }

    login(){
        console.log("Username : " + this.loginForm.find('username').value);
        console.log("Password : " + this.loginForm.find('password').value);
        if((this.loginForm.find('username').value != '') && (this.loginForm.find('password').value != '')){
            this._auth.setValue(true);
            // console.log(window.location.host);
            // window.location.replace(window.location.host + "/search");
            this._router.navigate(['']);
        }else{
            this.isRequired = true;
            console.log("Required values");
        }
    }

    resetError(){
        this.isRequired = false;
    }
}