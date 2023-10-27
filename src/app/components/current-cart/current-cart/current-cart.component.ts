import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-current-cart',
  templateUrl: './current-cart.component.html',
  styleUrls: ['./current-cart.component.scss']
})
export class CurrentCartComponent {
  @Input() cartData: Cart = new Cart(0,[],0,[],0)
  orderList : Order[] = []
  
  constructor(private cartService: CartService,private orderService: OrderService){
    this.orderService.getOrders().subscribe(data => {
      this.orderList = data
    })
  }

  getTotalCartAmount() : number{
    let amount = 0;
    this.cartData.dishes.forEach((dish,index) => {
      amount += dish.price * this.cartData.quantity[index]
    })
    return amount;
  }

  addQuantity(index : number){
    
    this.cartData.quantity[index]++;
    this.cartData.amount = this.getTotalCartAmount()
    this.cartService.updateCart(this.cartData).subscribe(data => {})
  }

  placeOrder(){
    let maxid = 0;
    this.orderList.forEach(element => {
      if(element.id > maxid){
        maxid = element.id
      }
    });
    let id = localStorage.getItem("id")
    let order = new Order(maxid+1,formatDate(new Date(), 'yyyy-MM-dd hh:mm', 'en-US'),this.cartData.amount,parseInt("" + id),this.cartData)
    this.orderService.addOrder(order).subscribe(data => {
      this.clearCart()
      location.reload()
    })
  }

  reduceQuantity(index : number){    
    this.cartData.quantity[index]--;
    if(this.cartData.quantity[index] == 0){
      this.cartData.dishes.splice(index,1)
      this.cartData.quantity.splice(index,1)
      
    }
    this.cartService.updateCart(this.cartData).subscribe(data => {})
    this.cartData.amount = this.getTotalCartAmount()
    
  }

  clearCart(){
    this.cartData.dishes.splice(0,this.cartData.dishes.length)
    this.cartData.quantity.splice(0,this.cartData.quantity.length)
    this.cartData.amount = 0
    this.cartData.rid = 0
    this.cartService.updateCart(this.cartData).subscribe(data => {})
  }
}
