import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {MemberListComponent} from './member/member-list/member-list.component';
import {MessageComponent} from './message/message.component';
import {ListComponent} from './list/list.component';
import {AuthGuard} from './guards/auth.guard';
import {MemberDetailComponent} from './member/member-detail/member-detail.component';
import {MemberDetailResolver} from './resolver/member-detail-resolver';
import {MemberEditComponent} from './member/member-edit/member-edit.component';
import {MemberEditResolver} from './resolver/member-edit-resolver';
import {PreventUnsaveChangesGuard} from './guards/prevent-unsave-changes.guard';
import {MemberListResolver} from './resolver/member-list-resolver';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members', component: MemberListComponent,
        resolve: {users: MemberListResolver}
      },
      {
        path: 'members/:id', component: MemberDetailComponent,
        resolve: {user: MemberDetailResolver}
      },
      {path: 'messages', component: MessageComponent},
      {path: 'lists', component: ListComponent},
      {
        path: 'member/edit', component: MemberEditComponent,
        resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsaveChangesGuard]
      }
    ]
  },

  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
