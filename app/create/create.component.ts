import {Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router'

import {User} from './user';
import {UserService} from '../shared/user.services';

@Component({
    selector: 'create-user',
    templateUrl: '/app/create/create.component.html',
    providers: [UserService]
})
export class CreateComponent implements OnInit, OnDestroy{
    newUserForm;
    title;
    id;
    subscribe;
    user = new User();
    constructor(fb: FormBuilder, private _route: ActivatedRoute, private _userService: UserService, private _router: Router){
        this.newUserForm = new FormGroup({
            name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
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
        this.subscribe = this._route.params.subscribe(params => this.id=params["id"]);
        this.title = (!this.id) ? "Add new user.." : "Edit user";
        if(!this.id){
            return;
        }

        this._userService.getUsers(this.id).subscribe(res => this.user = res);
    }

    ngOnDestroy(){
        this.subscribe.unsubscribe();
    }
    
    createUser(){
        console.log(this.newUserForm);
        if(this.id){
            this._userService.updateUser(this.newUserForm.value).subscribe(res => {
                alert("User updated successfully");
                this._router.navigate(['search']);
            })
            return;
        }else{
            this._userService.saveUser(this.newUserForm.value).subscribe(res =>{
                alert("User created successfully");
                this._router.navigate(['']);
            });
            return;
        }
    }
}