import { Injectable } from '@angular/core';
import { DishService } from '../dish/dish.service';
import { Cart } from 'src/app/models/cart';
import { Dish } from 'src/app/models/dish';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  arrCart: Cart[] = []
  arrDishes: Dish[] = []
  baseUrl: string = "http://localhost:3000"
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private dishService: DishService,private router:Router,private httpClient: HttpClient) {
  }

  getCart(): Observable<Cart[]>{
    return this.httpClient.get<Cart[]>(this.baseUrl + '/carts')
    .pipe(
      catchError(this.httpError)
    );
  }

  getCartById(cid: number): Observable<Cart>{
    return this.httpClient.get<Cart>(this.baseUrl + '/carts/' + cid)
    .pipe(
      catchError(this.httpError)
    );
  }

  updateCart(cartdata: Cart): Observable<Cart>{
    console.log(cartdata)
    return this.httpClient.put<Cart>(this.baseUrl + '/carts/'+ cartdata.id ,JSON.stringify(cartdata),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    )
  }

  addCart(cart: Cart): Observable<Cart>{
    return this.httpClient.post<Cart>(this.baseUrl + '/carts' ,JSON.stringify(cart),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    )
  }

  deleteCart(cid: number): Observable<Cart>{
    return this.httpClient.delete<Cart>(this.baseUrl + '/carts/' + cid)
  }

  httpError(error: HttpErrorResponse){
    let msg = ''
    if(error.error instanceof ErrorEvent){
      msg = error.error.message;
    }else{
      msg = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg)
  }
}
