import {CanDeactivate} from '@angular/router';
import {CreateComponent} from './create/create.component';

export interface FormComponent{
    hasUnsavedChanges(): Boolean;
}
export class ConfirmDeactivateComponent implements CanDeactivate<FormComponent>{
    canDeactivate(target: FormComponent){
        console.log(target.hasUnsavedChanges());
        if(target.hasUnsavedChanges()){
            return confirm("Page has unsaved changes. Do you want to proceed?");
        }
        return true;
    }
}