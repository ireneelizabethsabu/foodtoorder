import { Injectable } from '@angular/core';
import { Dish } from 'src/app/models/dish';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  arrDishes: Dish[] = []
  
  constructor() { 
    this.arrDishes = [
      new Dish(1,"Hyderabadi Biriyani",true,230,''),
      new Dish(2,"Mixed fried rice",true,180,''),
      new Dish(3,"Chicken Noodles",true,250,''),
      new Dish(4,"Butter Naan",true,33,''),
      new Dish(5,"Paneer Butter Masala",true,110,''),
    ]
  }

  getDishes(): Dish[] {
    return this.arrDishes
  }
}
