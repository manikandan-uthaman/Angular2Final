import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService{

    constructor(private _http: Http){

    }

    getUsers(userId?){
        var url = 'https://jsonplaceholder.typicode.com/users';
        if(userId)
            url = url + '/' + userId
        return this._http.get(url).map(res => res.json());
    }

    saveUser(request){
        return this._http.post('https://jsonplaceholder.typicode.com/posts', JSON.stringify(request))
                            .map(res => res.json())
    }

    updateUser(request){
        return this._http.put('https://jsonplaceholder.typicode.com/posts/1', JSON.stringify(request))
                            .map(res => res.json())
    }
}
