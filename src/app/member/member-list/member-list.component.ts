import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {AlertifyService} from '../../services/alertify.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private alertify: AlertifyService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  // tslint:disable-next-line:typedef
  loadUsers() {
    this.userService.getAllUser().subscribe(value => this.users = value,
      error => {
        this.alertify.error(error);
      });
  }

}
