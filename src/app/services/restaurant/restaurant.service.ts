import { Injectable } from '@angular/core';
import { Address } from 'src/app/models/address';
import { Dish } from 'src/app/models/dish';
import { Restaurant } from 'src/app/models/restaurant';
import { DishService } from '../dish/dish.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {
  arrRestaurants: Restaurant[] = []
  arrAddress: Address[] = []
  arrDishes: Dish[] = []
  
  baseUrl: string = "http://localhost:3000"
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private dishService:DishService,private router: Router,private httpClient: HttpClient) {
    this.arrDishes = dishService.getDishes()
  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.httpClient.get<Restaurant[]>(this.baseUrl + '/restaurants')
    .pipe(
      catchError(this.httpError)
    )
  }

  getRestaurantById(rid: number): Observable<Restaurant>{
    return this.httpClient.get<Restaurant>(this.baseUrl + '/restaurants/' + rid)
    .pipe(
      catchError(this.httpError)
    )
  }

  deleteRestaurant(rid: number): Observable<Restaurant>{
    return this.httpClient.delete<Restaurant>(this.baseUrl + '/restaurants/' + rid)
    .pipe(
      catchError(this.httpError)
    )
  }

  addRestaurant(restaurant: Restaurant): Observable<Restaurant>{
    return this.httpClient.post<Restaurant>(this.baseUrl + '/restaurants' ,JSON.stringify(restaurant),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    )
  }

  updateRestaurant(restaurant: Restaurant): Observable<Restaurant>{
    return this.httpClient.put<Restaurant>(this.baseUrl + '/restaurants/'+ restaurant.id ,JSON.stringify(restaurant),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    )
  }
  
  httpError(error: HttpErrorResponse){
    let msg = ' ';
    if(error.error instanceof ErrorEvent){
      msg = error.error.message;
    } 
    else{
      msg = `Error code: ${error.status}\nMessage: ${error.message}`
    }
    return throwError(msg);
  }
}