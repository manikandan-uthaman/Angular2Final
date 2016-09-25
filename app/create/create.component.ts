import {Component} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
    selector: 'create-user',
    templateUrl: '/app/create/create.component.html'
})
export class CreateComponent{
    newUserForm;
    constructor(fb: FormBuilder){
        this.newUserForm = new FormGroup({
            name: new FormControl('Mani', Validators.required),
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

    createUser(){
        console.log(this.newUserForm);
    }
}