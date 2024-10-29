import { BehaviorSubject, Observable, map } from 'rxjs';
import { Injectable, OnInit, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  private apiUrl = environment.apiUrl;
  private currentUserSubject!: BehaviorSubject<User | null>;
  public currentUser!: Observable<User | null>;

  private _httpClient = inject(HttpClient)

  constructor() {

  }
  ngOnInit(): void {

    // const storedUser = localStorage.getItem('currentUser');
    // this.currentUserSubject = new BehaviorSubject<User | null>(storedUser ? JSON.parse(storedUser) : null);
    // this.currentUser = this.currentUserSubject.asObservable();

  }

  // public get currentUserValue(): User | null {
  //   return this.currentUserSubject.value;
  // }
  signUp(userData: User): Observable<User> {
    return this._httpClient.post<any>(`${this.apiUrl}sign-up`, { userData }).pipe(map(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }));
  }
  login(email: string, password: string): Observable<User> {
    return this._httpClient.post<any>(`${this.apiUrl}login`, { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
