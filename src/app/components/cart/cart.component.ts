import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  arrCarts: Cart[] = []
    
  constructor(private cartService: CartService,private router:Router) {
    cartService.getCart().subscribe(data => {
      this.arrCarts = data
    })
  }

  deleteCart(id:number){
    this.cartService.deleteCart(id).subscribe(data => {})
  }

  viewCartById(cid: number){
    this.router.navigate(['cartdetails/' + cid])
  }
}
