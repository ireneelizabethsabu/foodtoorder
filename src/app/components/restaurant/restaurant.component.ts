import { Component} from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent {
    arrRestaurants: Restaurant[] = []
    outOfStock: number[] = []
    currentRestaurantsToShow :Restaurant[] = []

    length = 2;
    pageSize = 2;
    pageIndex = 0;
    pageSizeOptions = [2,3,5];

    hidePageSize = false;
    showPageSizeOptions = true;
    showFirstLastButtons = true;
    disabled = false;

    pageEvent: PageEvent = new PageEvent();
    
    constructor(private restaurantService: RestaurantService,private router: Router) {
      restaurantService.getRestaurants().subscribe(data => {
        this.arrRestaurants = data;
        this.outOfStock = new Array(this.arrRestaurants.length).fill(0)
        this.length = this.arrRestaurants.length
        this.currentRestaurantsToShow = this.arrRestaurants.slice(0,3);
      })
      
    }

    dishOutOfStock(evt: any){
      console.log(evt)
      this.outOfStock[evt.index] = evt.count
    }

    isAdmin(){
      if(localStorage.getItem("role") == "admin") return true
      return false
    }

    handlePageEvent(e: PageEvent) {
      
      this.pageEvent = e;
      this.length = e.length;
      this.pageSize = e.pageSize;
      this.pageIndex = e.pageIndex;
      this.currentRestaurantsToShow =  this.arrRestaurants.slice(this.pageIndex*this.pageSize,this.pageIndex*this.pageSize + this.pageSize);
    }
  
    setPageSizeOptions(setPageSizeOptionsInput: string) {
      if (setPageSizeOptionsInput) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
      }
    }
    
}
