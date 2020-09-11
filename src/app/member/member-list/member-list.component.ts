import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {AlertifyService} from '../../services/alertify.service';
import {ActivatedRoute} from '@angular/router';
import {PaginatedResult, Pagination} from '../../models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  userParams: any = {};
  pageNumber = 1;
  pageSize = 3;
  pagination: Pagination;

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 1;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
    this.loadUsers(this.pageNumber, this.pageSize);

  }

  // tslint:disable-next-line:typedef
  loadUsers(x, y) {
    this.userService.getAllUser(x, y, this.userParams).subscribe(value => {
        this.users = value.resullt, this.pagination = value.pagination;
        console.log(this.users);
      },
      error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers(this.pagination.currentPage, this.pagination.itemsPerPage);
  }

  // tslint:disable-next-line:typedef
  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 1;
    this.userParams.maxAge = 99;
    this.loadUsers(this.pageNumber, this.pageSize);
  }

}
