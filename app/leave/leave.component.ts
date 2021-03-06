import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FORM_DIRECTIVES, FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms'
import {DateFormatter} from '@angular/common/src/facade/intl';

import {UserService} from '../shared/user.services'
import {LeaveDetails} from './leave-details'
import {DateValidatorComponent} from './date-validator.component'
import {FormComponent} from '../confirm-deactivate.component'
import {AuthService} from '../login/auth-user.component'

@Component({
    selector: 'leave',
    templateUrl: '/app/leave/leave.component.html',
    providers: [UserService],
    directives: [FORM_DIRECTIVES]
})
export class LeaveComponent implements OnInit, OnDestroy, FormComponent{
    isLoading;
    isError;
    id;
    subscribe;
    leaveForm;
    fromDate;
    toDate;
    today;
    isNewLeave=false;
    leaveCategory;
    temp;
    leaveDetails = new LeaveDetails();
    constructor(private _route: ActivatedRoute, private _userServices: UserService, fb: FormBuilder, private _router: Router, private _auth: AuthService){
        this.today = (new Date("02/29/2016").getTime() + (1*24*60*60*1000));
        this.temp = new Date(this.today);
        this.leaveForm = new FormGroup({
            leaveCategory: new FormControl('C'),
            fromDate: new FormControl('', Validators.compose([Validators.required, DateValidatorComponent.invalidDate])),
            toDate: new FormControl('', Validators.compose([Validators.required, DateValidatorComponent.invalidDate])),
            remarks: new FormControl('')
        })
        this.subscribe = this._route.params.subscribe(params => this.id = params["id"]);
    }

    ngOnInit(){
        // if(!this._auth.getValue())
        //     this._router.navigate(['login']);
            
        if(!this.id)
            return;
        this.isLoading = true;
        this._userServices.getUsers(this.id).subscribe(result => {
                this.leaveDetails.userID = result.id;
                this.leaveDetails.userName = result.name;
                this.leaveDetails.leaveCategory = (result && result.leaveCategory)?result.leaveCategory:'C';
                this.leaveDetails.fromDate = "09/01/2016";
                this.leaveDetails.toDate = "10/01/2016";
                this.leaveDetails.remarks = "Casual";
                this.leaveDetails.annualLeaveRemaining = 15;
                if(this.id == '2')
                    result.leaveCategory = 'E';
                this.leaveCategory = result.leaveCategory;
                if(result.leaveCategory == 'E')
                {
                    this.leaveDetails.fromDate = "";
                    this.leaveDetails.toDate = "";
                    this.leaveDetails.remarks = "";
                    this.isNewLeave = true;
                }
                this.isLoading = false;
                this.isError = false;
        },
        error => {
            this.isError = true;
            this.isLoading = false;
            console.error("Service Error : " + error)
        })
    }

    ngOnDestroy(){
        this.subscribe.unsubscribe();
    }

    setToDate(){
        var from = new Date(this.leaveDetails.fromDate);
        if(!this.leaveForm.find('fromDate').errors){
            var temp = new Date((new Date(this.leaveDetails.fromDate).getTime() + (30*24*60*60*1000)));
            this.leaveDetails.toDate = DateFormatter.format(temp, 'in', 'MM/dd/yyyy');
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
        this.isLoading = true;
        if(this.isNewLeave){
            this._userServices.saveUser(this.leaveForm.value).subscribe(result => {
                this.isLoading = false;
                this.isError = false;
                this.leaveForm.reset();
                alert("Leave Details added successfully");
                this._router.navigate(['']);
            },
            error => {
                this.isError = true;
                this.isLoading = false;
                console.error("Service Error : " + error)
            });           
        }else{
            this._userServices.updateUser(this.leaveForm.value).subscribe(result => {
                this.isLoading = false;
                this.isError = false;
                this.leaveForm.reset();
                alert("Leave Details updated successfully");
                this._router.navigate(['']);
            },
            error => {
                this.isError = true;
                this.isLoading = false;
                console.error("Service Error : " + error)
            });
        }
        console.log(this.leaveForm);
    }

    addnewLeave(){
        this.isNewLeave = true;
        this.leaveDetails.fromDate = '';
        this.leaveDetails.toDate = '';
        this.leaveDetails.remarks = '';
    }

    onFromChange(){
        if(this.leaveDetails.leaveCategory == 'C' && !this.leaveForm.find('fromDate').errors){
            this.today = (new Date("02/29/2016").getTime() + (1*24*60*60*1000));
            this.temp = new Date(this.today);
            
            var temp = new Date((new Date(this.leaveDetails.fromDate).getTime() + (30*24*60*60*1000)));
            this.leaveDetails.toDate = DateFormatter.format(temp, 'in', 'MM/dd/yyyy');
        }
    }

    hasUnsavedChanges(){
        return this.leaveForm.dirty;
    }
}