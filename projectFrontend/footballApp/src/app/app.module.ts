import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './pages/user/login/login.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { PlayersComponent } from './pages/user/players/players.component';
import { TeamsComponent } from './pages/user/teams/teams.component';
import { CompetitionsComponent } from './pages/user/competitions/competitions.component';
import { PlayersNewsComponent } from './pages/user/players-news/players-news.component';
import { TeamsNewsComponent } from './pages/user/teams-news/teams-news.component';
import { CompetitionsNewsComponent } from './pages/user/competitions-news/competitions-news.component';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HomeComponent } from './pages/general/home/home.component';
import { Error404Component } from './pages/general/error404/error404.component';
import { TeamCrestComponent } from './shared/team-crest/team-crest.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { GlobalService } from './providers/services/global.service';
import { AuthInterceptor } from './providers/interceptors/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AddPermissionComponent } from './pages/admin/add-permission/add-permission.component';
import { AddPermissionToRoleComponent } from './pages/admin/add-permission-to-role/add-permission-to-role.component';
import { AddRoleComponent } from './pages/admin/add-role/add-role.component';
import { AddRoleToUserComponent } from './pages/admin/add-role-to-user/add-role-to-user.component';
import { FollowTeamComponent } from './pages/user/follow-team/follow-team.component';
import { FollowPlayerComponent } from './pages/user/follow-player/follow-player.component';
import { FollowCompetitionComponent } from './pages/user/follow-competition/follow-competition.component';
import { CompetitionStandingsComponent } from './pages/user/competition-standings/competition-standings.component';
import { AddOrUpdateCompetitionComponent } from './pages/admin/add-or-update-competition/add-or-update-competition.component';
import { AddOrUpdateTeamSquadComponent } from './pages/admin/add-or-update-team-squad/add-or-update-team-squad.component';
import { ShowAllCompetitionsComponent } from './pages/competition/show-all-competitions/show-all-competitions.component';
import { ShowOneCompetitionComponent } from './pages/competition/show-one-competition/show-one-competition.component';
import { MatchesComponent } from './pages/team/matches/matches.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    PlayersComponent,
    TeamsComponent,
    CompetitionsComponent,
    PlayersNewsComponent,
    TeamsNewsComponent,
    CompetitionsNewsComponent,
    HomeComponent,
    Error404Component,
    TeamCrestComponent,
    DashboardComponent,
    AddPermissionComponent,
    AddPermissionToRoleComponent,
    AddRoleComponent,
    AddRoleToUserComponent,
    FollowTeamComponent,
    FollowPlayerComponent,
    FollowCompetitionComponent,
    CompetitionStandingsComponent,
    AddOrUpdateCompetitionComponent,
    AddOrUpdateTeamSquadComponent,
    ShowAllCompetitionsComponent,
    ShowOneCompetitionComponent,
    MatchesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    GlobalService,
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
