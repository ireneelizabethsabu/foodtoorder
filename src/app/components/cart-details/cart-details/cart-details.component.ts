import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})

export class CartDetailsComponent {
  cartDetails: Cart = new Cart(0,[],0,[],0)
  
  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService)
  {
    this.activatedRoute.params.subscribe((params: Params) => {
        let id = params['cid']
        cartService.getCartById(id).subscribe(data =>{
          this.cartDetails = data;
        })
    })
  }
}
