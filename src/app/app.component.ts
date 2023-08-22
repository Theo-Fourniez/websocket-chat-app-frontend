import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './services/user/User';
import { UserStore } from './stores/user.store';
import { UserService } from './services/user/user.service';
import {
  bounceInAnimation,
  bounceInOnEnterAnimation,
  fadeInLeftOnEnterAnimation,
  fadeInOnEnterAnimation,
  fadeInRightOnEnterAnimation,
  fadeOutLeftOnLeaveAnimation,
  fadeOutRightOnLeaveAnimation,
  zoomInOnEnterAnimation,
} from 'angular-animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fadeInLeftOnEnterAnimation({
      duration: 400,
    }),
    fadeInRightOnEnterAnimation({
      duration: 400,
    }),
    fadeOutRightOnLeaveAnimation({
      duration: 400,
    }),
    fadeOutLeftOnLeaveAnimation({
      duration: 400,
    }),

    zoomInOnEnterAnimation({
      duration: 400,
    }),
  ],
})
export class AppComponent implements OnInit {
  currentUser$: Observable<User | null>;
  selectedRecipientName: string | null = null;

  constructor(
    private userStore: UserStore,
    private userService: UserService,
  ) {
    this.currentUser$ = userStore.getUser();
  }
  ngOnInit(): void {
    this.userService.tryAuthenticateWithCookie().subscribe({
      next: (user) => {
        console.log('Logged in with the session cookie :D !');
        this.userStore.setUser(user);
      },
      error: (err) => {
        console.log('Could not login with a session cookie :( ', err);
      },
    });
  }

  selectRecipient(selectedRecipientName: string) {
    this.selectedRecipientName = selectedRecipientName;
  }

  deselectRecipient() {
    this.selectedRecipientName = null;
  }
}
