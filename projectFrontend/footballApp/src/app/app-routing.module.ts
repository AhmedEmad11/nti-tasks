import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrUpdateCompetitionComponent } from './pages/admin/add-or-update-competition/add-or-update-competition.component';
import { AddOrUpdateTeamSquadComponent } from './pages/admin/add-or-update-team-squad/add-or-update-team-squad.component';
import { AddPermissionToRoleComponent } from './pages/admin/add-permission-to-role/add-permission-to-role.component';
import { AddPermissionComponent } from './pages/admin/add-permission/add-permission.component';
import { AddRoleToUserComponent } from './pages/admin/add-role-to-user/add-role-to-user.component';
import { AddRoleComponent } from './pages/admin/add-role/add-role.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ShowAllCompetitionsComponent } from './pages/competition/show-all-competitions/show-all-competitions.component';
import { ShowOneCompetitionComponent } from './pages/competition/show-one-competition/show-one-competition.component';
import { Error404Component } from './pages/general/error404/error404.component';
import { HomeComponent } from './pages/general/home/home.component';
import { CompetitionsNewsComponent } from './pages/user/competitions-news/competitions-news.component';
import { CompetitionsComponent } from './pages/user/competitions/competitions.component';
import { FollowCompetitionComponent } from './pages/user/follow-competition/follow-competition.component';
import { FollowPlayerComponent } from './pages/user/follow-player/follow-player.component';
import { FollowTeamComponent } from './pages/user/follow-team/follow-team.component';
import { LoginComponent } from './pages/user/login/login.component';
import { PlayersNewsComponent } from './pages/user/players-news/players-news.component';
import { PlayersComponent } from './pages/user/players/players.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { TeamsNewsComponent } from './pages/user/teams-news/teams-news.component';
import { TeamsComponent } from './pages/user/teams/teams.component';
import { IsAdminGuard } from './providers/guards/is-admin.guard';
import { IsLoggedGuard } from './providers/guards/is-logged.guard';
import { IsNotLoggedGuard } from './providers/guards/is-not-logged.guard';

const routes: Routes = [
  {path:"register", component:RegisterComponent, canActivate:[IsNotLoggedGuard]},
  {path:"login", component:LoginComponent, canActivate:[IsNotLoggedGuard]},
  {path:"user", children:[
    {path:"", component:ProfileComponent},

    {path:"players", component:PlayersComponent},
    {path:"followPlayer", component:FollowPlayerComponent},
    {path:"playersNews", component:PlayersNewsComponent},

    {path:"teams", component:TeamsComponent},
    {path:"followTeam", component:FollowTeamComponent},
    {path:"teamsNews", component:TeamsNewsComponent},

    {path:"competitions", component:CompetitionsComponent},
    {path:"followCompetition", component:FollowCompetitionComponent},
    {path:"competitionsNews", component:CompetitionsNewsComponent}

  ], canActivate:[IsLoggedGuard]},
  {path:"", component:HomeComponent},
  
  {path:"admin", children:[
    {path:"", component:DashboardComponent},
    {path:"addPermission", component:AddPermissionComponent},
    {path:"addPermissionToRole", component:AddPermissionToRoleComponent},
    {path:"addRoleToUser", component:AddRoleToUserComponent},
    {path:"addRole", component:AddRoleComponent},

    {path:"addOrUpdateCompetition", component:AddOrUpdateCompetitionComponent},
    
    {path:"addOrUpdateTeamSquad", component:AddOrUpdateTeamSquadComponent}
  ], canActivate:[IsLoggedGuard, IsAdminGuard]},

  {path:"competition", children:[
    {path:"all", component:ShowAllCompetitionsComponent},
    {path:"one/:id", component:ShowOneCompetitionComponent}
  ], canActivate:[IsLoggedGuard]},

  {path:"team", children:[
  ], canActivate:[IsLoggedGuard]},

  {path:"**", component:Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
