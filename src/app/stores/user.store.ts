import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../services/user/User';
import { Friend } from '../types/Friend';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor() {}

  setUser(user: User) {
    this.userSubject.next(user);
  }

  clearUser() {
    this.userSubject.next(null);
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  setFriends(friends: Friend[]) {
    this.userSubject.next({
      ...this.userSubject.value!,
      friends,
    });
  }
}
