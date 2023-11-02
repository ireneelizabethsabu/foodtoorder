import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/helpers/passwordValidator';
import { Address } from 'src/app/models/address';
import { Cart } from 'src/app/models/cart';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signUpForm  : FormGroup
  submitted: boolean = false
  arrUsers: User[] = []
  
  firstName: AbstractControl
  lastName: AbstractControl
  email: AbstractControl
  dob: AbstractControl
  mobileNumber: AbstractControl
  houseNumber: AbstractControl
  street: AbstractControl
  area: AbstractControl
  city: AbstractControl
  state: AbstractControl
  country: AbstractControl
  pincode: AbstractControl
  password: AbstractControl
  confirmPassword: AbstractControl
  
  constructor(private fb: FormBuilder,private userService: UserService,private cartService:  CartService){
    this.signUpForm = fb.group({
      'firstName': ["", Validators.required],
      'lastName': ["",  Validators.required],
      'email': ["", Validators.required],
      'mobileNumber': ["", Validators.required],
      'dob': ["", Validators.required],
      
      'houseNumber': ["", Validators.required],
      'street': ["", Validators.required],
      'area': ["", Validators.required],
      'city': ["", Validators.required],
      'country': ["", Validators.required],
      'pincode': ["", Validators.required],
      'password': ["",Validators.required],
      'confirmPassword': ["", Validators.required],
      
    },{
      validator: MustMatch('password','confirmPassword')
    })

    userService.getUsers().subscribe(data => {
      this.arrUsers = data;
    })
    this.firstName = this.signUpForm.controls['firstName']
    this.lastName = this.signUpForm.controls['lastName']
    this.email = this.signUpForm.controls['email']
    this.dob = this.signUpForm.controls['email']
    this.mobileNumber = this.signUpForm.controls['mobileNumber']
    this.houseNumber = this.signUpForm.controls['houseNumber']
    this.street = this.signUpForm.controls['street']
    this.area = this.signUpForm.controls['area']
    this.city = this.signUpForm.controls['city']
    this.state = this.signUpForm.controls['state']
    this.country = this.signUpForm.controls['country']
    this.pincode = this.signUpForm.controls['pincode']
    this.password = this.signUpForm.controls['password']
    this.confirmPassword = this.signUpForm.controls['confirmPassword']
  }

  onSubmit(value: string): void{
    this.submitted = true
    if(this.signUpForm.invalid){
      console.log(this.signUpForm)
      return;
    }

    var maxId = 0
    this.arrUsers.forEach(user => {
      if(maxId < user.id)
        maxId = user.id
    })

    //console.log('you submitted  value: ',value);
    let id = maxId + 1
    let firstName = this.signUpForm.value.firstName;
    let lastName = this.signUpForm.value.lastName;
    let email = this.signUpForm.value.email;
    let mobileNumber = this.signUpForm.value.mobileNumber;
    let dob = this.signUpForm.value.dob;
    let houseNumber = this.signUpForm.value.houseNumber;
    let street = this.signUpForm.value.street;
    let area = this.signUpForm.value.area;
    let city = this.signUpForm.value.city;
    let state = '';
    let country = this.signUpForm.value.country;
    let pincode = this.signUpForm.value.pincode;
    let password = this.signUpForm.value.password;
    let role = 'user';

    
    let user = new User(id,firstName,lastName,role,dob,email,password,
      new Address(id,houseNumber,street,area,city,state,country,pincode),mobileNumber)
      console.log(user)
    this.userService.addUser(
      user
    ).subscribe(data => { 
      
      let cart = new Cart(parseInt(data.id + ""),[],0,[],0)
      this.cartService.addCart(cart).subscribe(data => { console.log("Added new cart")})
    });
    location.reload()
  }  
}
