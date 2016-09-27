import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms'
import {DateFormatter} from '@angular/common/src/facade/intl';

import {UserService} from '../shared/user.services'
import {LeaveDetails} from './leave-details'
import {DateValidatorComponent} from './date-validator.component'

@Component({
    selector: 'leave',
    templateUrl: '/app/leave/leave.component.html',
    providers: [UserService],
    directives: [FORM_DIRECTIVES]
})
export class LeaveComponent implements OnInit, OnDestroy{
    id;
    isCasual;
    subscribe;
    leaveForm;
    fromDate;
    toDate;
    today = DateFormatter.format(new Date, 'in', 'dd/MM/yyyy');
    leaveDetails = new LeaveDetails();
    constructor(private _route: ActivatedRoute, private _userServices: UserService, fb: FormBuilder){
        this.leaveForm = fb.group({
            fromDate: ['', Validators.compose([Validators.required, DateValidatorComponent.invalidDate])],
            toDate: ['', Validators.compose([Validators.required, DateValidatorComponent.invalidDate])],
        })
        // this.fromDate = new FormControl('', Validators.compose([Validators.required]))
        this.subscribe = this._route.params.subscribe(params => this.id = params["id"]);
    }

    ngOnInit(){
        if(!this.id)
            return;
        this._userServices.getUsers(this.id).subscribe(result => {
            this.leaveDetails.userID = result.id;
            this.leaveDetails.userName = result.name;
            this.leaveDetails.leaveCategory = 'A';
            this.leaveDetails.fromDate = "09/01/2016";
            this.leaveDetails.toDate = "30/01/2016";
            this.leaveDetails.remarks = "Casual";
            this.isCasual = (this.leaveDetails.leaveCategory == 'C')
        })
    }

    ngOnDestroy(){
        this.subscribe.unsubscribe();
    }

    onSubmit(){
        console.log(this.leaveForm.controls.fromDate.errors);
    }
}