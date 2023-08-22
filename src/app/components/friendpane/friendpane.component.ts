import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { Friend } from 'src/app/types/Friend';
import { UserStore } from 'src/app/stores/user.store';
import { User } from 'src/app/services/user/User';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { FormControl, Validators } from '@angular/forms';
import { fadeInLeftOnEnterAnimation } from 'angular-animations';
@Component({
  selector: 'app-friendpane',
  templateUrl: './friendpane.component.html',
  styleUrls: ['./friendpane.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [
    fadeInLeftOnEnterAnimation({
      duration: 400,
      translate: '5%',
    }),
  ],
})
export class FriendpaneComponent {
  @Input() friends: Friend[] = [];
  @Output() selectFriendEvent = new EventEmitter<string>();

  currentUser$: Observable<User | null>;

  // Friend adding section
  isInAddMode = false;
  friendToAddName = new FormControl('', [Validators.required]);

  constructor(
    private userStore: UserStore,
    private userService: UserService,
    private renderer: Renderer2,
  ) {
    this.currentUser$ = userStore.getUser();
  }

  toggleAddMode() {
    this.isInAddMode = !this.isInAddMode;
    if (this.isInAddMode) {
      setTimeout(() => {
        this.focusAddFriendInput();
      }, 0);
    }
  }

  clearAddFriendForm() {
    this.friendToAddName.setValue('');
  }

  focusAddFriendInput() {
    this.renderer.selectRootElement('#friendToAddName').focus();
  }

  submitAddFriendForm() {
    if (this.friendToAddName.value === null) {
      alert('Friend name is required');
      return;
    }
    this.userService
      .addFriend(this.friendToAddName.value)
      .subscribe({
        next: (res: Friend[]) => {
          console.log('Friend added successfully');
          this.toggleAddMode();
          this.userStore.setFriends(res);
        },
        error: (err) => {
          console.log(
            'Error adding friend : ',
            this.friendToAddName.value,
            ' does not exist',
          );
          alert(
            'Error adding friend : ' +
              this.friendToAddName.value +
              ' does not exist',
          );
        },
      })
      .add(() => {
        this.clearAddFriendForm();
        this.focusAddFriendInput();
      });
  }
}
