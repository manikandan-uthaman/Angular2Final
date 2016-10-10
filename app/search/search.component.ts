import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, FORM_DIRECTIVES} from '@angular/forms';
import {Router} from '@angular/router';

import {UserService} from '../shared/user.services'
import {AuthService} from '../login/auth-user.component'
import {PaginationComponent} from './pagination.component'
@Component({
    selector: 'search',
    templateUrl: '/app/search/search.component.html',
    providers: [UserService],
    directives: [FORM_DIRECTIVES, PaginationComponent]
})
export class SearchComponent implements OnInit{
    searchForm;
    userDetails=[];
    searchValue;
    isLoading;
    isError;
    resultCount=0;
    currentPage=1;
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
        this.getUsers();
    }

    deleteUser(user){
        if(confirm("Are you sure you want to delete " + user.name + "?")){
            this.isLoading = true;
            this._userService.deleteUser(user.id).subscribe(res=>{
                this.isLoading = false;
                var index = this.userDetails.indexOf(user);
                this.userDetails.splice(index, 1);
                this.getUsers();
            }, err =>{
                this.isLoading = false;
                alert("Sorry! Could not delete user");
            })
        }
    }

    onPageChanged(page){
        this.getUsers(page);
    }

    getUsers(page?){
        this.isLoading = true;
        this._userService.getUsers().subscribe( result => {
            this.isLoading = false;
            this.isError = false;
            this.userDetails = result;
            if(page == 8){
                this.userDetails = this.userDetails.slice(0,6);
            }
            this.resultCount = 76;   
            this.currentPage = (page)?page:1;
        },
        error => {
            this.isError = true;
            this.isLoading = false;
            console.error("Service Error : " + error)
        });
    }
}