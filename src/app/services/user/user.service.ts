




import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  arrUsers:User[]=[]
  baseUrl: string = "http://localhost:3000"

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient) {  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl + '/users')
    .pipe(
      catchError(this.httpError)
    );
  }

  getUserById(uid: number): Observable<User>{
    return this.httpClient.get<User>(this.baseUrl + '/users/' + uid)
    .pipe(
      catchError(this.httpError)
    );
  }

  addUser(user: User): Observable<User>{
    return this.httpClient.post<User>(this.baseUrl + '/users/' , JSON.stringify(user),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    );
  }

  updateUser(user : User): Observable<User>{
    return this.httpClient.put<User>(this.baseUrl + '/users/' + user.id, JSON.stringify(user),this.httpHeader)
    .pipe(
      catchError(this.httpError)
    );
    
  }
  
  deleteUser(id : number): Observable<User>{
    return this.httpClient.delete<User>(this.baseUrl + '/users/' + id)
    .pipe(
      catchError(this.httpError)
    );
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
