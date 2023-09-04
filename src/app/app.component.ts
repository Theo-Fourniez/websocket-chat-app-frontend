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
import { PushNotificationsService } from './services/pushnotifications.service';
import { Router } from '@angular/router';
import { ChatStore } from './stores/chat.store';
import { Friend } from './types/Friend';
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
  currentUser$: Observable<User | null> = this.userStore.getUser();
  selectedRecipient$: Observable<Friend | null> = this.chatStore.getUser();

  constructor(
    private userStore: UserStore,
    private userService: UserService,
    private chatStore: ChatStore,
    private pushNotificationsService: PushNotificationsService,
    private router: Router,
  ) {
    this.pushNotificationsService
      .subscribeToPushNotifications()
      .then((sub) => {
        console.debug('Subscribed to push notifications !', sub);
      })
      .catch((err) => {
        console.error('Could not subscribe to push notifications :(', err);
      });
  }
  ngOnInit() {
    this.userService.tryAuthenticateWithCookie().subscribe({
      next: (user) => {
        console.debug('Logged in with the session cookie :D !');
        this.userStore.setUser(user);
      },
      error: (err) => {
        console.debug('Could not login with a session cookie :( ', err);
      },
    });
  }

  selectRecipient(selectedRecipient: Friend) {
    this.chatStore.selectChatRecipient(selectedRecipient);
  }

  deselectRecipient() {
    this.chatStore.selectChatRecipient(null);
  }
}
