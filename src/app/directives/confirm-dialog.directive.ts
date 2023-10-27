import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { DialogComponent } from '../components/dialog/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user/user.service';
import { RestaurantService } from '../services/restaurant/restaurant.service';
import { CartService } from '../services/cart/cart.service';
import { OrderService } from '../services/order/order.service';

@Directive({
  selector: '[appConfirmDialog]'
})
export class ConfirmDialogDirective {

  @Input('appConfirmDialog')  id: number = 0
  @Input() componentName : string = ""

  constructor(private el: ElementRef,public dialog: MatDialog,
    private userService:UserService,
    private restaurantService: RestaurantService,
    private cartService: CartService,
    private orderService:OrderService) { }

  @HostListener('click') onClick() {
    this.openDialog('0ms', '0ms')
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    console.log(this.id)
    const dref = this.dialog.open(DialogComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dref.afterClosed().subscribe((confirmed: string) => {
      console.log(this.componentName)
      if(confirmed == "delete"){
        if(this.componentName == "user"){
          this.userService.deleteUser(this.id).subscribe(data => {})
        }else if(this.componentName == "restaurant"){
          this.restaurantService.deleteRestaurant(this.id).subscribe(data => {})
        }else if(this.componentName == "cart"){
          this.cartService.deleteCart(this.id).subscribe(data => {})
        }else if(this.componentName == "order"){
          this.orderService.deleteOrder(this.id).subscribe(data => {})
        }
        
        location.reload()
      }
    })
  }

}
