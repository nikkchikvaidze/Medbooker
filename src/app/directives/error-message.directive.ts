import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, debounceTime } from 'rxjs';
@Directive({
  selector: '[appErrorMessage]',
})
export class ErrorMessageDirective implements OnInit {
  @Input() set control(control: any) {
    if (!control || !control.valueChanges) {
      return;
    }
    // console.log(control._parent);
    // if ((control = control._parent.controls.firstName)) {
    //   console.log('firstName11');
    // }
    control.valueChanges.subscribe((x: any) => {
      console.log(x);
    });
  }
  @Input() set myForm(form: any) {
    if (!form || !form.valueChanges) {
      return;
    }
    // console.log(control._parent);
    // if ((control = control._parent.controls.firstName)) {
    //   console.log('firstName11');
    // }
    form.valueChanges.subscribe((x: any) => {
      console.log(`form:`, x);
    });
  }
  // @Input() controlName!: string;
  // errorMessageSubject = new BehaviorSubject('');
  // errorMessage$ = this.errorMessageSubject.asObservable();
  // error: string | undefined;
  // span = this.renderer.createElement('span');
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    // console.log(this.appSetErrorMessage);
    // this.isValid(this.appSetErrorMessage.get(`${this.controlName}`)!);
  }
  // isValid(c: AbstractControl) {
  //   this.setValidationMessage(c);
  // }
}
