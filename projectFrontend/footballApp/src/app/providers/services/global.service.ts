import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public backend:boolean = false
  public dataApi:boolean = false
  private baseUrl:string = "http://localhost:3000"

  public userData:any

  public isAdmin:any = false
  public isAuthed:boolean = false
  public userEmail:string = ""

  constructor(private _http:HttpClient) {}

  getAllTeamsApi():Observable<any>{
    this.backend = false
    this.dataApi = true
    return this._http.get('http://api.football-data.org/v2/competitions/2021/teams')
  }

  register(data:any):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.post(`${this.baseUrl}/user/register`, data)
  }

  login(data:any):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.post(`${this.baseUrl}/user/login`, data)
  }
  
  profile():Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/user/profile`)
  }

  getPermissions():Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/admin/showPermissions`)
  }

  getRoles():Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/admin/showRoles`)
  }

  addPost(data:any):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.post(`${this.baseUrl}/post/add`, data)
  }

  addPermission(data:any):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.post(`${this.baseUrl}/admin/addPermission`, data)
  }
  
  addPermissionToRole(data:any):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.post(`${this.baseUrl}/admin/addPermissionToRole`, data)
  }

  addRole(data:any):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.post(`${this.baseUrl}/admin/addRole`, data)
  }

  addRoleToUser(data:any):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.post(`${this.baseUrl}/admin/addRoleToUser`, data)
  }

  logout():Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.post(`${this.baseUrl}/user/logout`, null)
  }

  followedPlayers():Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/user/players`)
  }

  followedTeams():Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/user/teams`)
  }

  followedCompetitions():Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/user/competitions`)
  }

  unfollowCompetition(data:any):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.post(`${this.baseUrl}/user/unFollowCompetition`, data)
  }

  followPlayer(data:any):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.post(`${this.baseUrl}/user/followPlayer`, data)
  }

  unfollowPlayer(data:any):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.post(`${this.baseUrl}/user/unFollowPlayer`, data)
  }

  followTeam(data:any):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.post(`${this.baseUrl}/user/followTeam`, data)
  }

  unfollowTeam(data:any):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.post(`${this.baseUrl}/user/unFollowTeam`, data)
  }

  followCompetition(data:any):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.post(`${this.baseUrl}/user/followCompetition`, data)
  }

  getAllPlayers():Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/player/showAll`)
  }

  getAllTeams():Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/team/showAll`)
  }

  getSinglePlayer(id:any):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/player/showOne/${id}`)
  }

  getSingleTeam(id:any):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/team/showOne/${id}`)
  }

  getSingleCompetition(id:any):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/competition/showOne/${id}`)
  }

  getAllCompetitions():Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/competition/showAll`)
  }

  getFollowedPlayersNews():Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/user/allPlayersNews`)
  }

  getFollowedTeamsNews():Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/user/allTeamsNews`)
  }

  getFollowedCompetitionsNews():Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/user/allCompetitionsNews`)
  }

  getStandings(id:string):Observable<any>{
    this.backend = false
    this.dataApi = true
    return this._http.get(`http://api.football-data.org/v2/competitions/${id}/standings`)
  }

  getCompMatches(id:string, matchday:string):Observable<any>{
    this.backend = false
    this.dataApi = true
    return this._http.get(`http://api.football-data.org/v2/competitions/${id}/matches?status=SCHEDULED&matchday=${matchday}`)
  }

  getTeamMatches(id:string, dateNow:string, dateNextWeek:string):Observable<any>{
    this.backend = false
    this.dataApi = true
    return this._http.get(`http://api.football-data.org/v2/teams/${id}/matches?status=SCHEDULED&dateFrom=${dateNow}&dateTo=${dateNextWeek}`)
  }

  getAllCompetitionsApi(){
    this.backend = false
    this.dataApi = true
    return this._http.get(`http://api.football-data.org/v2/competitions/?plan=TIER_ONE`)
  }

  addOrUpdateCompetition(id:string):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/admin/addOrUpdateCompetition/${id}`)
  }

  addOrUpdateCompetitionTeams(id:string):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/admin/addOrUpdateCompetitionTeams/${id}`)
  }

  addOrUpdateTeamSquad(id:string):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.get(`${this.baseUrl}/admin/addOrUpdateTeamSquad/${id}`)
  }

  deleteCompetition(id:string):Observable<any>{
    this.dataApi = false
    this.backend = true
    return this._http.delete(`${this.baseUrl}/admin/deleteCompetition/${id}`)
  }
}
