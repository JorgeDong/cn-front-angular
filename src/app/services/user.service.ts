import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  create_user(emailParam, usernameParam) {
    return this.http.post(environment.API_USER + '/createUser', {
      email: emailParam,
      usrName: usernameParam
    }).toPromise();
  }

  read_user(usernameParam) {
    return this.http.get(environment.API_USER + '/readUser?usrName=' + usernameParam).toPromise();
  }

  update_user(userParam) {
    return this.http.patch(environment.API_USER + '/updateUser', userParam).toPromise();
  }
}
