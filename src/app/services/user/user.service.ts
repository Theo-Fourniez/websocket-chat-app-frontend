import { Injectable } from '@angular/core';
import { UserCredentials } from './UserCredentials';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './User';
import { Observable, Subscription, firstValueFrom, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { UserStore } from 'src/app/stores/user.store';
import { Friend } from 'src/app/types/Friend';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userStore: UserStore,
  ) {}

  public authenticate(username: string, password: string): Observable<User> {
    let credentials = new UserCredentials(username, password);
    return this.http.get<User>(environment.baseApiUrl + 'user', {
      headers: new HttpHeaders()
        .set('Authorization', credentials.toAuthorizationHeader())
        .set('Content-Type', 'application/json'),
    });
  }

  public tryAuthenticateWithCookie(): Observable<User> {
    return this.http.get<User>(environment.baseApiUrl + 'user', {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  public getFriends(): Observable<Friend[]> {
    return this.http.get<Friend[]>(environment.baseApiUrl + 'user/friends');
  }

  logout() {
    this.http.get(environment.baseApiUrl + 'user/logout').subscribe({
      next: () => {
        this.userStore.clearUser();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('Error logging out', err);
      },
    });
  }

  addFriend(username: string): Observable<Friend[]> {
    return this.http.post<Friend[]>(environment.baseApiUrl + 'user/friends', {
      username: username,
    });
  }
}
