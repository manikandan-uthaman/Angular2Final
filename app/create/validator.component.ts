import {FormControl} from '@angular/forms'

export class FormValidator{
    static emailValidation(control: FormControl){
        var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!control.value || regEx.test(control.value))
            return null;
        return {invalidEmail: true};
    }
}
