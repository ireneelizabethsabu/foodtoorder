import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
 
  arrUsers: User[] = []
  patternForm: FormGroup
  namePattern: AbstractControl
  patternUsers: User[] = []

  constructor(private userService:UserService,private router: Router,private fb: FormBuilder){
    userService.getUsers().subscribe(data => {
      this.arrUsers = data;
    })
    this.patternForm = fb.group({
      'namePattern': ['', Validators.required]
    })

    this.namePattern = this.patternForm.controls['namePattern']
  }

  viewUser(uid: number){
    this.router.navigate(['userdetails/' + uid ])
  }
  
  onSubmit(value: any): void{
    console.log('you submitted  value: ',value.namePattern);
   
    this.patternUsers = this.arrUsers.filter(user => {
      let name = (user.firstName + " " + user.lastName).toLowerCase();
      return name.includes(value.namePattern.toLowerCase()) 
    })
    
  }
}
