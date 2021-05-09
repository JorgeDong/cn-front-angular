import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {
  confirmUser = false;
  didFail = false;
  isLoading = false;
  emailUser: String;
  usernameUser: String;
  @ViewChild('usrForm') form: NgForm;

  constructor(private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {
    this.authService.authIsLoading.subscribe(
      (isLoading: boolean) => this.isLoading = isLoading
    );
    this.authService.authDidFail.subscribe(
      (didFail: boolean) => this.didFail = didFail
    );
  }

  onSubmit() {
    const usrName = this.form.value.username;
    this.usernameUser = usrName;
    const email = this.form.value.email;
    this.emailUser = email;
    const password = this.form.value.password;
    this.authService.signUp(usrName, email, password);
  }

  onDoConfirm() {
    this.confirmUser = true;
  }

  onConfirm(formValue: { usrName: string, validationCode: string }) {
    this.authService.confirmUser(formValue.usrName, formValue.validationCode);
    this.userService.create_user(this.emailUser, this.usernameUser);
  }
}
