import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environment.dev';
import { ChatStore } from '../stores/chat.store';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PushNotificationsService {
  readonly VAPID_PUBLIC_KEY = environment.vapidPublicKey;

  constructor(
    private swPush: SwPush,
    private chatStore: ChatStore,
    private http: HttpClient,
  ) {
    this.swPush = swPush;
    this.swPush.messages.subscribe((message) => {
      console.debug('Received message from SW', message);
    });
  }

  private subscribeToNotificationsClicks(): void {
    this.swPush.notificationClicks.subscribe(
      (event: {
        action: string;
        notification: NotificationOptions & {
          title: string;
        };
      }) => {
        if (event.action === 'open-message') {
          console.debug('User clicked on a notification !', event);
          setTimeout(() => {
            this.chatStore.selectChatRecipient({
              // open the chat with the user that sent the message
              username: event.notification.data.username,
            });
          }, 250);
        }
      },
    );
  }
  subscribeToPushNotifications(): Promise<PushSubscription | void> {
    this.subscribeToNotificationsClicks();
    return this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => {
        console.debug('Successfully subscribed to push notifications', sub);
        this.http
          .post(environment.baseUrl + 'push/subscribe', sub)
          .subscribe()
          .add(() => {
            console.debug('Successfully sent subscription to the server');
          });
        return sub;
      })
      .catch((err) => {
        console.debug('Could not subscribe to push notifications', err);
      });
  }
}
