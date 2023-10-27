import { Component } from '@angular/core';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { Address } from 'src/app/models/address';
import { CartService } from 'src/app/services/cart/cart.service';
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})

export class BannerComponent {
  arrUsers: User[] = []
  currCart: Cart = new Cart(0,[],0,[],0)
  signInForm: FormGroup
  submitted: boolean = false

  constructor(private userService: UserService,private cartService: CartService,private fb : FormBuilder){
    userService.getUsers().subscribe(data => {
      this.arrUsers = data;
    })
    this.signInForm = fb.group({
      'email': ["",Validators.required],
      'password': ["",Validators.required]
    })
  }
  
  get fc(){
    return this.signInForm.controls;
  }

  onSubmit(){
    
    this.submitted =true;
    // if(this.signInForm.invalid)
    //   return;
    //console.log(this.fc['email'].value,this.fc['password'].value)
    for(let i=0; i<this.arrUsers.length; i++){
      console.log(this.fc['email'].value,this.arrUsers[i].email)
      if(this.arrUsers[i].email == this.fc['email'].value && this.arrUsers[i].password == this.fc['password'].value){
          console.log(this.arrUsers[i])
          localStorage.setItem("role",this.arrUsers[i].role);
          localStorage.setItem("id",this.arrUsers[i].id.toString());
          location.reload()
      }
    }
  }

  loadCurrentCart(){
    let id = localStorage.getItem("id")
    this.cartService.getCartById(parseInt(id + "")).subscribe(data => {

      this.currCart = data
    },
    error => {
      let cart = new Cart(parseInt(id + ""),[],0,[],0)
      this.cartService.addCart(cart).subscribe(data => { console.log("Added new cart")})
    })
  }

  isLogin(){
    if(localStorage.getItem('id')){
      return true
    }else{
      return false
    }
  }

  logout(){
    
    localStorage.removeItem("id")
    localStorage.removeItem("role")
    location.reload();  
  }
}
