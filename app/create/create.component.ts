import {Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router'

import {User} from './user';
import {UserService} from '../shared/user.services';
import {FormValidator} from './validator.component'
import {FormComponent} from '../confirm-deactivate.component'
import {AuthService} from '../login/auth-user.component'

@Component({
    selector: 'create-user',
    templateUrl: '/app/create/create.component.html',
    providers: [UserService]
})
export class CreateComponent implements OnInit, OnDestroy, FormComponent{
    newUserForm;
    title;
    id;
    subscribe;
    isLoading;
    isError;
    user = new User();
    constructor(fb: FormBuilder, private _route: ActivatedRoute, private _userService: UserService, private _router: Router, private _auth: AuthService){
        this.newUserForm = new FormGroup({
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.compose([Validators.required, FormValidator.emailValidation])),
            phone: new FormControl(''),
            address: fb.group({
                street: new FormControl(''),
                suite: new FormControl(''),
                city: new FormControl(''),
                zipcode: new FormControl('')
            })
        })
    }

    ngOnInit(){
        // if(!this._auth.getValue())
        //     this._router.navigate(['login']);
        this.subscribe = this._route.params.subscribe(params => this.id=params["id"]);
        this.title = (!this.id) ? "Add new user.." : "Edit user";
        if(!this.id){
            return;
        }
        this.isLoading = true;
        this._userService.getUsers(this.id).subscribe(res => {
            this.isLoading = false;
            this.isError = false;
            this.user = res;
        },
        error => {
            this.isError = true;
            this.isLoading = false;
            console.error("Service Error : " + error)
        });
    }

    ngOnDestroy(){
        this.subscribe.unsubscribe();
    }

    createUser(){
        console.log(this.newUserForm);
        if(this.id){
            this.isLoading = true;
            this._userService.updateUser(this.newUserForm.value).subscribe(res => {
                this.isLoading = false;
                this.isError = false;
                this.newUserForm.reset();
                alert("User updated successfully");
                this._router.navigate(['search']);
            },
            error => {
                this.isError = true;
                this.isLoading = false;
                console.error("Service Error : " + error)
            })
            return;
        }else{
            window.scroll(0,0);
            this.isLoading = true;
            this._userService.saveUser(this.newUserForm.value).subscribe(res =>{
                this.isError = false;
                this.isLoading = false;
                this.newUserForm.reset();
                alert("User created successfully");
                this._router.navigate(['']);
            },
            error => {
                this.isError = true;
                this.isLoading = false;
                console.error("Service Error : " + error)
            });
            return;
        }
    }

    hasUnsavedChanges(){
        return this.newUserForm.dirty;
    }
}