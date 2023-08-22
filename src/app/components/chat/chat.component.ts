import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ChatMessage } from 'src/app/types/ChatMessage';
import { ReceivedMessagePayload } from 'src/app/types/websocket/ReceivedMessagePayload';
import { SendMessagePayload } from 'src/app/types/websocket/SendMessagePayload';
import { environment } from 'src/environments/environment.development';
@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  selector: 'app-chat',
})
export class ChatComponent implements OnDestroy {
  // TODO : connect the websocket on user login and disconnect on logout, the websocket should be a service
  ws: WebSocketSubject<any>;

  messageInput = new FormControl('');
  messages: ChatMessage[] = [];

  chatRecipient = '';

  @Output() deselectChatRecipientEvent = new EventEmitter<true>();

  constructor(private chatService: ChatService) {
    this.ws = webSocket(environment.websocketsUrl);
  }

  ngOnDestroy() {
    this.ws.unsubscribe(); // Close the websocket connection when we leave the component
  }

  deselectChatRecipient() {
    this.deselectChatRecipientEvent.emit(true);
  }

  @Input()
  set id(recipientUsername: string) {
    this.chatRecipient = recipientUsername;
    this.chatService
      .getConversationWithUser(this.chatRecipient)
      .subscribe((messages) => {
        this.messages = messages;
      });
    this.connectToWebSocket();
  }

  connectToWebSocket(): Subscription {
    return this.ws.subscribe({
      next: (msg: ReceivedMessagePayload) => {
        if (msg.from === 'Server') {
          alert(msg.message);
        } else {
          this.messages.push({
            content: msg.message,
            createdAt: new Date(Date.now()),
            areYouTheSender: false,
          });
        }
      },
      error: (err) => console.log('websocket error : ', err),
      complete: () => console.log('closed websocket connection'),
    });
  }

  sendMessage() {
    const message: SendMessagePayload = {
      to: this.chatRecipient,
      message: this.messageInput.value ?? '',
    };
    console.log('Sending message: ', message);

    this.ws.next(message);

    this.messages.push({
      content: message.message,
      createdAt: new Date(Date.now()),
      areYouTheSender: true,
    });
  }

  isWebSocketConnected() {
    return !this.ws.closed;
  }
}
