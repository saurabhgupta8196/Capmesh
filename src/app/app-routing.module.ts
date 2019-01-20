import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { AuthComponent } from './auth/auth.component';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { PostComponent } from './post/post.component';
import { MyNetworksComponent } from './connection/my-networks/my-networks.component';
import { MyConnectionsComponent } from './connection/my-connections/my-connections.component';
import { MyInvitationsComponent } from './connection/my-invitations/my-invitations.component';
import { InvitationsReceivedComponent } from './connection/invitations-received/invitations-received.component';
import { InvitationsSentComponent } from './connection/invitations-sent/invitations-sent.component';
import { BlockListComponent } from './connection/block-list/block-list.component'


const routes: Routes = [
  { path: 'auth/:key', component: AuthComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:userName', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'chats', component: ChatboxComponent, canActivate: [AuthGuard] },
  { path: 'chats/:userName', component: ChatboxComponent, canActivate: [AuthGuard] },
  { path: 'home', component: PostComponent, canActivate: [AuthGuard] },
  { path: "my-networks", component: MyNetworksComponent },
  { path: "my-networks/my-connections", component: MyConnectionsComponent },
  { path: 'my-networks/my-invitations', component: MyInvitationsComponent,
    children: [
      { path: 'sent', component: InvitationsSentComponent },
      { path: 'received', component: InvitationsReceivedComponent },
      { path: 'block-list', component: BlockListComponent }
    ]}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)

  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }

export const ConnectionComponents: any = [
  MyNetworksComponent,
  MyConnectionsComponent,
  MyInvitationsComponent,
  InvitationsReceivedComponent,
  InvitationsSentComponent,
  BlockListComponent
];

