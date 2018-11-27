import { Validators, NG_VALIDATORS, AbstractControl } from '@angular/forms';

import { Directive, Input } from '@angular/core';


@Directive({
    selector: '[appValidacion]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ValidacionPersonificadaDirective,
        multi: true
    }]
})

export class ValidacionPersonificadaDirective implements Validators {

    @Input() appValidacion: string;

    public validacionPassword(control: AbstractControl): {[key: string]: any} | null {

        const controlAComparar = control.parent.get(this.appValidacion);

        if (controlAComparar && controlAComparar.value !== control.value) {
            return { 'noSonIguales': true };
        }
        return null;
    }
}

