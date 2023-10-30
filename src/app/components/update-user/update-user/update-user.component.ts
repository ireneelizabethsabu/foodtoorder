import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
  userForm  : FormGroup
  submitted: boolean = false
  arrUsers: User[] = []
  idUpdated: number = -1
  user: User = new User(0,'','','user','','','',new Address(0,0,"","","","","",""),"")
  aid: number = 0

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
  role: AbstractControl
  

  constructor(private fb: FormBuilder,private userService: UserService){
    this.userForm = fb.group({
      'id': [""],
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
      'role': ["user"]
      
    })
    userService.getUsers().subscribe(data => {
      this.arrUsers = data;
      console.log(data)
    })
    this.firstName = this.userForm.controls['firstName']
    this.lastName = this.userForm.controls['lastName']
    this.email = this.userForm.controls['email']
    this.dob = this.userForm.controls['email']
    this.mobileNumber = this.userForm.controls['mobileNumber']
    this.houseNumber = this.userForm.controls['houseNumber']
    this.street = this.userForm.controls['street']
    this.area = this.userForm.controls['area']
    this.city = this.userForm.controls['city']
    this.state = this.userForm.controls['state']
    this.country = this.userForm.controls['country']
    this.pincode = this.userForm.controls['pincode']
    this.password = this.userForm.controls['password']
    this.role = this.userForm.controls['role']
    
  }

  onChangeType(evt: any){
    console.log(evt.target.value)
    let idObtained = evt.target.value
    this.idUpdated = parseInt(idObtained.split(":")[1].trim());['1','1']
    
    this.userService.getUserById(this.idUpdated).subscribe(data => {
      this.user = data;
      this.aid = this.user.address.id
      this.userForm.get('firstName')?.setValue(this.user.firstName)
      this.userForm.get('lastName')?.setValue(this.user.lastName)
      this.userForm.get('email')?.setValue(this.user.email)
      this.userForm.get('mobileNumber')?.setValue(this.user.mobileNumber)
      this.userForm.get('dob')?.setValue(this.user.dob)
      this.userForm.get('houseNumber')?.setValue(this.user.address.houseNo)
      this.userForm.get('street')?.setValue(this.user.address.street)
      this.userForm.get('area')?.setValue(this.user.address.area)
      this.userForm.get('city')?.setValue(this.user.address.city)
      this.userForm.get('pincode')?.setValue(this.user.address.pincode)
      this.userForm.get('state')?.setValue(this.user.address.state)
      this.userForm.get('country')?.setValue(this.user.address.country)
      this.userForm.get('password')?.setValue(this.user.password)
      this.userForm.get('role')?.setValue(this.user.role)
    })
  }

  OnUpdate(value: string){
      
      this.submitted = true
      
      console.log("hi")
      //let id = maxId + 1
      let firstName = this.userForm.value.firstName;
      let lastName = this.userForm.value.lastName;
      let email = this.userForm.value.email;
      let mobileNumber = this.userForm.value.mobileNumber;
      let dob = this.userForm.value.dob;
      let houseNumber = this.userForm.value.houseNumber;
      let street = this.userForm.value.street;
      let area = this.userForm.value.area;
      let city = this.userForm.value.city;
      let state = this.userForm.value.state;
      let country = this.userForm.value.country;
      let pincode = this.userForm.value.pincode;
      let password = this.userForm.value.password;
      let role = this.userForm.value.role;
      console.log(role)
   
      this.userService.updateUser(new User(this.idUpdated,firstName,lastName,role,dob,email,password,
        new Address(this.aid,houseNumber,street,area,city,state,country,pincode),mobileNumber)).subscribe(data => {})
        location.reload()
  }

  onClear(){
    this.userForm = this.fb.group({
      'id': [""],
      'firstName': ["", Validators.required],
      'lastName': ["",  Validators.required],
      'email': ["", Validators.required],
      'mobileNumber': ["", Validators.required],
      'dob': ["", Validators.required],
      'role': ["user"],
      'houseNumber': ["", Validators.required],
      'street': ["", Validators.required],
      'area': ["", Validators.required],
      'city': ["", Validators.required],
      'country': ["", Validators.required],
      'pincode': ["", Validators.required],
      'password': ["",Validators.required],
      
      
    })
  }
}
