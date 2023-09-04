import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Friend } from '../types/Friend';

@Injectable({
  providedIn: 'root',
})
export class ChatStore {
  private chatRecipientSubject: BehaviorSubject<Friend | null> =
    new BehaviorSubject<Friend | null>(null);

  constructor() {}

  selectChatRecipient(user: Friend | null) {
    this.chatRecipientSubject.next(user);
  }

  getUser(): Observable<Friend | null> {
    return this.chatRecipientSubject.asObservable();
  }
}
