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
    subscribe;
    leaveForm;
    fromDate;
    toDate;
    today;
    leaveDetails = new LeaveDetails();
    constructor(private _route: ActivatedRoute, private _userServices: UserService, fb: FormBuilder){
        this.leaveForm = new FormGroup({
            leaveCategory: new FormControl('C'),
            fromDate: new FormControl('', Validators.compose([Validators.required, DateValidatorComponent.invalidDate])),
            toDate: new FormControl('', Validators.compose([Validators.required, DateValidatorComponent.invalidDate]))
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
            this.leaveDetails.leaveCategory = (result && result.leaveCategory)?result.leaveCategory:'C';
            this.leaveDetails.fromDate = "09/01/2016";
            this.leaveDetails.toDate = "10/01/2016";
            this.leaveDetails.remarks = "Casual";
            this.leaveDetails.annualLeaveRemaining = 15;
        })
    }

    ngOnDestroy(){
        this.subscribe.unsubscribe();
    }

    setToDate(){
        var from = new Date(this.leaveDetails.fromDate);
        if(!this.leaveForm.find('fromDate').errors){
            this.leaveDetails.toDate="10/01/2016";
        }
    }
    onSubmit(){
        var from = new Date(this.leaveDetails.fromDate);
        var to = new Date(this.leaveDetails.toDate);
        if(to < from){
            this.leaveForm.find('toDate').setErrors({invalidDate: true});
            return;
        }
        if(this.leaveDetails.leaveCategory == 'A'){
        var fromTime = new Date(this.leaveDetails.fromDate).getTime();
        var toTime = new Date(this.leaveDetails.toDate).getTime();
        var leavePeriod = (toTime - fromTime)/(1000*60*60*24); 

        if((leavePeriod > this.leaveDetails.annualLeaveRemaining)){
            this.leaveForm.find('toDate').setErrors({insuffecientDays: true});
        }

        }

        console.log(this.leaveForm);
    }
}