import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import { ChatMessage } from 'src/app/types/ChatMessage';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ConversationComponent implements AfterViewChecked {
  @Input() messages: ChatMessage[] = [];

  constructor(private refToThis: ElementRef) {}

  ngAfterViewChecked() {
    // Called every time the view is updated
    this.scrollThisToBottom();
  }

  scrollThisToBottom() {
    try {
      this.refToThis.nativeElement.scrollTop =
        this.refToThis.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
