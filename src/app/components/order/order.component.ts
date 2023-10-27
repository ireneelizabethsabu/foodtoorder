import { Component } from '@angular/core';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  arrOrders: Order[] = []

  constructor(private orderService:OrderService,private router:Router){
    orderService.getOrders().subscribe(data => {
      this.arrOrders = data;
    })
  }

  viewOrderById(oid: number){
    this.router.navigate(['orderdetails/' + oid])
  }
}
