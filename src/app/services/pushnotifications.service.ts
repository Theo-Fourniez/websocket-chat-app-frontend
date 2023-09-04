import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environment.dev';
import { ChatStore } from '../stores/chat.store';
@Injectable({
  providedIn: 'root',
})
export class PushNotificationsService {
  readonly VAPID_PUBLIC_KEY = environment.vapidPublicKey;

  constructor(
    private swPush: SwPush,
    private chatStore: ChatStore,
  ) {
    this.swPush = swPush;
  }

  subscribeToNotificationsClicks(): void {
    this.swPush.notificationClicks.subscribe(
      (event: {
        action: string;
        notification: NotificationOptions & {
          title: string;
        };
      }) => {
        if (event.action === 'open-message') {
          console.debug('User clicked on a notification !', event);
          this.chatStore.selectChatRecipient({
            // open the chat with the user that sent the message
            username: event.notification.data.username,
          });
        }
      },
    );
  }
  subscribeToPushNotifications(): Promise<PushSubscription> {
    this.subscribeToNotificationsClicks();
    return this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY,
    });
  }
}
