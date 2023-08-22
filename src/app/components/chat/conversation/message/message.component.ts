import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChatMessage } from 'src/app/types/ChatMessage';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  @Input() message!: ChatMessage;

  constructor() {}
}
