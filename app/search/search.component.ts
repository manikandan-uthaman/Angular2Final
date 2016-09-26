import {Component} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators, NgModel, FORM_DIRECTIVES} from '@angular/forms';

import {UserService} from '../shared/user.services'
@Component({
    selector: 'search',
    templateUrl: '/app/search/search.component.html',
    providers: [UserService],
    directives: [NgModel, FORM_DIRECTIVES]
})
export class SearchComponent{
    searchForm;
    userDetails=[];
    searchValue;
    constructor(fb: FormBuilder, private _userService: UserService){
        this.searchValue = '';
        this.searchForm = new FormGroup({
            searchValue: new FormControl(''),
        })
    }

    resetError(){
            // this.searchForm.find('searchValue').value = '';
            this.searchForm.find('searchValue').setErrors(null);        
    }
    searchUser(){
        if(this.searchValue == ''){
            this.searchForm.find('searchValue').setErrors({'required': true});
            console.log(this.searchForm);
            return;
        }

        this._userService.getUsers().subscribe( result => this.userDetails = result);
    }
}