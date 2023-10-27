import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl: string = "http://localhost:3000"
  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getOrders(): Observable<Order[]>{
    return this.httpClient.get<Order[]>(this.baseUrl + '/orders')
    .pipe(
      catchError(this.httpError)
    );
  }

  getOrderById(oid: number): Observable<Order>{
    return this.httpClient.get<Order>(this.baseUrl + '/orders/' + oid)
    .pipe(
      catchError(this.httpError)
    );
  }

  addOrder(order: Order): Observable<Order>{
    return this.httpClient.post<Order>(this.baseUrl + '/orders' ,JSON.stringify(order),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    )
  }

  updateOrder(order: Order): Observable<Order>{
    return this.httpClient.put<Order>(this.baseUrl + '/orders/' + order.id,JSON.stringify(order),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    )
  }

  deleteOrder(oid: number): Observable<Order>{
    return this.httpClient.delete<Order>(this.baseUrl + '/orders/' + oid)
    .pipe(
      catchError(this.httpError)
    )
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
