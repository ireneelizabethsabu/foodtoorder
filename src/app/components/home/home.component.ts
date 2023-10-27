import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { interval } from 'rxjs/internal/observable/interval';
import { Dish } from 'src/app/models/dish';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant/restaurant.service';
import { filter, map, take } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  arrRestaurants: Restaurant[] = []
  outOfStock: number[] = []
  dish: Dish[] = []
  
  dishes$: Observable<Dish[]> = new Observable<Dish[]>;
  searchForm: FormGroup
  search: AbstractControl 
  str: string = ""
  
  constructor(private restaurantService: RestaurantService,private router: Router,private fb :FormBuilder) {
    restaurantService.getRestaurants().subscribe(data => {
      this.arrRestaurants = data;
      this.outOfStock = new Array(this.arrRestaurants.length).fill(0)
      
      data.forEach(restaurant => {
        this.dish = this.dish.concat(restaurant.dishes)
        
      });
      
    })
    
    this.searchForm = fb.group({
      'search' : ['']
    })
    this.search = this.searchForm.controls['search']
  }

  
  isAdmin(){
    if(localStorage.getItem("role") == "admin") return true
    return false
  }

  resend() {
    let matchingDish = this.dish.filter(dish => dish.name.toLowerCase().includes(this.searchForm.value.search.toLowerCase()))
    this.dishes$ = interval(1000).pipe(
      map(i => matchingDish),
      take(matchingDish.length)
    );
    console.log(this.dishes$)
  }

  
}
