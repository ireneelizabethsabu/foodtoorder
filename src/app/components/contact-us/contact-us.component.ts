import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
    feedbackForm: FormGroup
    name: AbstractControl
    email: AbstractControl
    mobileNumber: AbstractControl
    details: AbstractControl
    submitted: boolean = false

    constructor(fb: FormBuilder){
      this.feedbackForm = fb.group({
        'name': ["", Validators.required],
        'email': ["", Validators.required],
        'mobileNumber': ["", Validators.required],
        'details': ["", Validators.required]
      })

      this.name = this.feedbackForm.controls['name']
      this.email = this.feedbackForm.controls['email']
      this.mobileNumber = this.feedbackForm.controls['mobileNumber']
      this.details = this.feedbackForm.controls['details']
    }
    onSubmit(value: string){
      this.submitted = true
      if(this.feedbackForm.invalid){
        return;
      }
      console.log("hello")
    }
}
