import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user:any = {}
  teams:any[] = []
  teamsData:any[] = []

  constructor(public _global:GlobalService) { }

  ngOnInit(): void {
    this._global.profile().subscribe(
      data=>{
      this.user = data.data
    },
      ()=>{},
      ()=>{}
    )
    this._global.followedTeams().subscribe(
      data=>{
      this.teams = data.data
    },
      ()=>{},
      ()=>{
        this.teams.forEach((team:any)=>{
          this._global.getSingleTeam(team.id).subscribe(
            data=>{
              this.teamsData.push(data.data)
            }
          )
        })
      }
    )
  }

}
