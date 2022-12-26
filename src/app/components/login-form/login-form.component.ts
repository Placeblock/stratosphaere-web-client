import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Output("submit") submit: EventEmitter<{"username": string, "password": string}> = new EventEmitter();

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.maxLength(50)]],
  });
  
  constructor(private fb: FormBuilder) {}

  logIn() {
    if (!this.loginForm.valid) return;
    let username = this.loginForm.get("username")?.value;
    let password = this.loginForm.get("password")?.value;
    if (username == null || password == null) return;
    this.submit.emit({"username":username,"password":password});
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
