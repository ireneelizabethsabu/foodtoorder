import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent implements OnInit{
  @Input() restaurant: Restaurant = new Restaurant(0,'',[],[],'',0)
  @Input() index: number = -1
  @Output() outOfStockEvt: EventEmitter<Object> = new EventEmitter()
  count: number = 0 
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    
    this.restaurant.dishes.forEach(dish => {
      if(dish.isAvailable == false){
        this.count++
      }
    })
    this.outOfStockEvt.emit({
      index: this.index,
      count: this.count
    })
  }
  
  viewDetails(rid:number){
    console.log(rid)
    this.router.navigate(['restaurantdetails/' + rid ])
  }

  isAdmin(){
    if(localStorage.getItem("role") == "admin") return true
    return false
  }
}
