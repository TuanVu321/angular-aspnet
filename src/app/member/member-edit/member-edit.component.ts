import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {AlertifyService} from '../../services/alertify.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm,{static:true}') editForm: NgForm;

  @HostListener('window:beforeunload', ['$event'])
  // tslint:disable-next-line:typedef
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private userService: UserService,
              private alertify: AlertifyService, private auth: AuthService, private router1: Router) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
  }

  // tslint:disable-next-line:typedef
  updateUser() {
    this.userService.updateUser(this.auth.decodeedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated success');
      // this.router1.navigate(['/members']);
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });

  }
}
