import {Control, ControlGroup} from '@angular/common';
import {FormControl} from '@angular/forms'
import {DateFormatter} from '@angular/common/src/facade/intl';

export class DateValidatorComponent{
    static invalidDate(control: FormControl){
        var date: string;
        date = control.value;
        var germanDatePattern = /^\d{1,2}\.\d{1,2}\.\d{4}$/;
                                
        if(!control.value)
            return null;
        if(date.length < 10)
            return {invalidDate: true};
        
        if(date.match(germanDatePattern))
            return {invalidDate: true};
        
        var dateArray = date.split('/');
        var month = parseInt(dateArray[0]);
        var day = parseInt(dateArray[1]);
        var year = parseInt(dateArray[2]);

        if((month <1) || (month >12))
            return {invalidDate: true};
        
        if((day <1) || (day >31))
            return {invalidDate: true};
        
        if(((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day == 31))
            return {invalidDate: true};
        
        if(month == 2){
            var isLeap = ((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0)));
            if((day > 29) || ((day == 29) && !isLeap))
                return {invalidDate: true};
        }
        return null;
    }
}