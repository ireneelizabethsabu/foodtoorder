import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Address } from 'src/app/models/address';
import { Cart } from 'src/app/models/cart';
import { Restaurant } from 'src/app/models/restaurant';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart/cart.service';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})

export class RestaurantDetailsComponent {
  restaurantDetails: Restaurant = new Restaurant(0,'',[],[],'',0)
  ownerDetails: User = new User(0,'','','user','','','',new Address(0,0,"","","","","",""),"")
  cartData: Cart = new Cart(0,[],0,[],0)
  
  constructor(private activatedRoute: ActivatedRoute, 
    private restaurantService: RestaurantService,
    private userService: UserService,private cartService: CartService ){
      this.activatedRoute.params.subscribe((params: Params) => {
        let id = params['rid']
        restaurantService.getRestaurantById(id).subscribe(data => {
          this.restaurantDetails = data
          console.log(this.restaurantDetails)
      })
        //this.ownerDetails = userService.getUserById(this.restaurantDetails.ownerid )
        let cid = localStorage.getItem("id")
        this.cartService.getCartById(parseInt(cid + "")).subscribe(data => {
          this.cartData = data;
        })
      })
  }

  getTotalCartAmount() : number{
    let amount = 0;
    this.cartData.dishes.forEach((dish,index) => {
      amount += dish.price * this.cartData.quantity[index]
    })
    return amount;
  }

  
  addQuantity(dishId: number,index: number){
    if(this.cartData.rid == this.restaurantDetails.id){
      let exist = false
      this.cartData.dishes.forEach((dish,index) => {
        if(dish.id == dishId){
          exist = true
          this.cartData.quantity[index]++;
          this.cartData.amount = this.getTotalCartAmount()
          return;
        }
      }) 
      if(!exist && this.cartData.rid == this.restaurantDetails.id){
        console.log(this.restaurantDetails.dishes[index])
        this.cartData.dishes.push(this.restaurantDetails.dishes[index])
        this.cartData.quantity.push(1)
        this.cartData.amount = this.getTotalCartAmount()
        this.cartService.updateCart(this.cartData).subscribe(data => {})
      }
    }else{
      this.cartData.rid = this.restaurantDetails.id
      this.cartData.amount = 0
      this.cartData.dishes = []
      this.cartData.quantity = []
      
      

      this.cartData.dishes.push(this.restaurantDetails.dishes[index])
      this.cartData.quantity.push(1)
      this.cartData.amount = this.getTotalCartAmount()
      this.cartService.updateCart(this.cartData).subscribe(data => {})

    }    
    
  }
}
