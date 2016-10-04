import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {
    private isLoggedIn = false;
    private userName = '';

    constructor() {}

    setValue(val) {
        this.isLoggedIn = val;
    }

    getValue() {
        return this.isLoggedIn;
    }

    setUserName(name){
        this.userName = name;
    }

    getUserName(){
        return this.userName;
    }
}