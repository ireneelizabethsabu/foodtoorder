import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Address } from 'src/app/models/address';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent {
  userDetails: User = new User(0,'','','user','','','',new Address(0,0,"","","","","",""),"")
  
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService)
  {
    this.activatedRoute.params.subscribe((params: Params) => {
        let id = params['uid']
        this.userService.getUserById(id).subscribe(data => {
          this.userDetails = data;
        })
    })
  }
}
