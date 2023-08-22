import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Friend } from 'src/app/types/Friend';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FriendlistComponent {
  @Input() friends: Friend[] = [];
  @Output() selectRecipientEvent = new EventEmitter<string>();

  constructor() {}
}
