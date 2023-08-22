import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private userStore: UserStore,
    private renderer: Renderer2,
  ) {}

  focusUsernameInput() {
    this.renderer.selectRootElement('#username').focus();
  }

  ngAfterViewInit() {
    this.focusUsernameInput();
  }

  loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
  });

  submitted = false;
  loginFailed = false;
  serverError = false;
  isWaitingForServerResponse = false;

  submitForm() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log('Form is invalid');
      return;
    }
    console.log(
      'Form submitted ' +
        this.loginForm.value.username +
        ':' +
        this.loginForm.value.password,
    );

    this.isWaitingForServerResponse = true;
    this.userService
      .authenticate(
        this.loginForm.value.username!,
        this.loginForm.value.password!,
      )
      .subscribe({
        next: (user) => {
          this.userStore.setUser(user);
          this.router.navigate(['/chat/user']);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status == 401) {
            this.loginFailed = true;
          } else {
            this.serverError = true;
          }
        },
      })
      .add(() => {
        this.isWaitingForServerResponse = false;
      });
  }

  isFormInvalid() {
    return this.loginForm.invalid;
  }

  /// The following two methods are used to display error messages
  formFieldHasErrorOfType(fieldName: string, errorType: string) {
    return (
      this.submitted &&
      this.loginForm.get(fieldName)?.invalid &&
      this.loginForm.get(fieldName)?.getError(errorType)
    );
  }

  formFieldHasError(fieldName: string) {
    return this.submitted && this.loginForm.get(fieldName)?.invalid;
  }
}
