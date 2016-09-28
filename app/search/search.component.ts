import {Component} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, FORM_DIRECTIVES} from '@angular/forms';

import {UserService} from '../shared/user.services'
@Component({
    selector: 'search',
    templateUrl: '/app/search/search.component.html',
    providers: [UserService],
    directives: [FORM_DIRECTIVES]
})
export class SearchComponent{
    searchForm;
    userDetails=[];
    searchValue;
    isLoading;
    constructor(fb: FormBuilder, private _userService: UserService){
        this.searchValue = '';
        this.searchForm = new FormGroup({
            searchValue: new FormControl(''),
        })
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
            this.isLoading = false
            this.userDetails = result   
        });
    }
}