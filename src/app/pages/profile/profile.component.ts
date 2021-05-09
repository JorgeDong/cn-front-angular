import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../user/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  userName: any;
  userObj: any;
  userData: any;
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    let obj: any = this.authService.getAuthenticatedUser();
    
    this.userName = obj.username;
    console.log(this.userName);

    this.userService.read_user(this.userName)
      .then(data => {
        this.userData = data;
        this.userData = this.userData.body.res;
        console.log(this.userData);
      })
      .catch(err => {
        console.error(err);
      });
  }

}
