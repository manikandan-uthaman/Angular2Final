import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UserService} from '../shared/user.services'
import {LeaveDetails} from './leave-details'

@Component({
    selector: 'leave',
    templateUrl: '/app/leave/leave.component.html',
    providers: [UserService]
})
export class LeaveComponent implements OnInit, OnDestroy{
    id;
    isCasual;
    subscribe;
    leaveDetails = new LeaveDetails();
    constructor(private _route: ActivatedRoute, private _userServices: UserService){
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
}