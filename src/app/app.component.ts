import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular01';
  jwtHelper = new JwtHelperService();

  constructor(private auth: AuthService) {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.auth.decodeedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
