import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerModel = false;
  values: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getValue();
  }

// tslint:disable-next-line:typedef
  registerToggle() {
    this.registerModel = true;
  }

  // tslint:disable-next-line:typedef
  getValue() {
    this.http.get('http://localhost:5000/api/value').subscribe(value1 => this.values = value1);
  }

  // tslint:disable-next-line:typedef
  cancelRegisterModel(registerModel: boolean) {
    this.registerModel = registerModel;
  }
}
