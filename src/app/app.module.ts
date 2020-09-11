import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {NavComponent} from './nav/nav.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {ErrorInterceptorProvider} from './intercepter/error.intercepter';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MemberListComponent} from './member/member-list/member-list.component';
import {ListComponent} from './list/list.component';
import {MessageComponent} from './message/message.component';
import {MemberCardComponent} from './member/member-card/member-card.component';
import {MemberDetailComponent} from './member/member-detail/member-detail.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {MemberDetailResolver} from './resolver/member-detail-resolver';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import {MemberEditComponent} from './member/member-edit/member-edit.component';
import {MemberEditResolver} from './resolver/member-edit-resolver';
import {PreventUnsaveChangesGuard} from './guards/prevent-unsave-changes.guard';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TimeagoModule} from 'ngx-timeago';
import {MemberListResolver} from './resolver/member-list-resolver';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ButtonsModule} from 'ngx-bootstrap/buttons';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListComponent,
    MessageComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimeagoModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
    ErrorInterceptorProvider,
    MemberDetailResolver,
    MemberEditResolver,
    PreventUnsaveChangesGuard,
    MemberListResolver,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
