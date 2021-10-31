import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  followedTeams:any[] = [] 
  followedTeamsData:any[] = []
  
  constructor(private _global:GlobalService, private router:Router) { }

  ngOnInit(): void {
    this.getFollowedTeams()
  }

  getFollowedTeams(){
    this._global.followedTeams().subscribe(
      data=>{
        this.followedTeams = data.data
      },
      ()=>{},
      ()=>{ 
        this.getTeamsData()
      }
    )
  }

  getTeamsData(){
    this.followedTeams.forEach(team=>{
      this._global.getSingleTeam(team.id).subscribe(
        data=>{
          this.followedTeamsData.push(data.data)
        },
        ()=>{},
        ()=>{}
      )
    })
  }

  unfollowTeam(id:any){
    this._global.unfollowTeam({"id":id}).subscribe(
      data=>{},
      ()=>{},
      ()=>{
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
        });
      }
    )
  }

  
}
