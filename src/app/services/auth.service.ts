import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  BaseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  decodeedToken: any;
  currentUser: User;

  // tslint:disable-next-line:typedef
  login(model: any) {
    return this.httpClient.post(this.BaseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodeedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
        }
      })
    );
  }

  // tslint:disable-next-line:typedef
  register(user: User) {
    return this.httpClient.post(this.BaseUrl + 'register', user);
  }

  // tslint:disable-next-line:typedef
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
