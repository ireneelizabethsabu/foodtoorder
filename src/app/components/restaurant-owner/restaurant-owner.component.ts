import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant-owner',
  templateUrl: './restaurant-owner.component.html',
  styleUrls: ['./restaurant-owner.component.scss']
})

export class RestaurantOwnerComponent {
  ownerid: number = 0
  restaurant: Restaurant[] = []
  
  constructor(private restaurantService: RestaurantService,private router: Router){
    this.ownerid = parseInt('' + localStorage.getItem("id"))
    restaurantService.getRestaurants().subscribe(data => {
      this.restaurant = data.filter(element => element.ownerid == this.ownerid)
    })

  }

  viewRestaurant(rid: number){
    this.router.navigate(['restaurantdetails/' + rid] )
  }

  deleteRestaurant(id : number){
    this.restaurantService.deleteRestaurant(id).subscribe(data => {})
    location.reload()
  }
}
