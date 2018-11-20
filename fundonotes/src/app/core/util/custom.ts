import { AbstractControl } from '@angular/forms';

export function passValidator(control: AbstractControl){
    if(control && (control.value !== null || control.value !== undefined)){
        let cPassValue = control.value;
        let passControl = control.root.get('Password');
        if(passControl){
            let passValue = passControl.value;
            if(passValue !== cPassValue){
                return{
                    isError : true
                };
            }
        } 
    }
    return false;
}