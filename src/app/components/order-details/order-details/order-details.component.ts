import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})

export class OrderDetailsComponent {
  orderDetails: Order = new Order(0,"",0,0,new Cart(0,[],0,[],0))
  
  constructor(private activatedRoute: ActivatedRoute, private orderService: OrderService)
  {
    this.activatedRoute.params.subscribe((params: Params) => {
        let id = params['oid']
        orderService.getOrderById(id).subscribe(data => {
          this.orderDetails = data;
        })
    })
  }
}
