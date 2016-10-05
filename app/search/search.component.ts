import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, FORM_DIRECTIVES} from '@angular/forms';
import {Router} from '@angular/router';

import {UserService} from '../shared/user.services'
import {AuthService} from '../login/auth-user.component'
@Component({
    selector: 'search',
    templateUrl: '/app/search/search.component.html',
    providers: [UserService],
    directives: [FORM_DIRECTIVES]
})
export class SearchComponent implements OnInit{
    searchForm;
    userDetails=[];
    searchValue;
    isLoading;
    isError;
    constructor(fb: FormBuilder, private _userService: UserService, private _router: Router, private _auth: AuthService){
        this.searchValue = '';
        this.searchForm = new FormGroup({
            searchValue: new FormControl(''),
        })
    }

    ngOnInit(){
        console.log("Auth service response : " + this._auth.getValue());
        // if(!this._auth.getValue())
        //     this._router.navigate(['login']);
    }

    resetError(){
            this.searchValue ='';
            this.searchForm.find('searchValue').setErrors(null);        
    }
    searchUser(){
        if(this.searchValue == ''){
            this.searchForm.find('searchValue').setErrors({'required': true});
            console.log(this.searchForm);
            return;
        }
        this.isLoading = true;
        this._userService.getUsers().subscribe( result => {
            this.isLoading = false;
            this.isError = false;
            this.userDetails = result;   
        },
        error => {
            this.isError = true;
            this.isLoading = false;
            console.error("Service Error : " + error)
        });
    }
}