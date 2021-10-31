import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {

  followedCompetitions:any[] = [] 
  followedCompetitionsData:any[] = []
  followedCompetitionsStandings:any[] = []

  constructor(private _global:GlobalService, private router:Router) { }

  ngOnInit(): void {
    this.getFollowedCompetitions()
    
  }

  getFollowedCompetitions(){
    this._global.followedCompetitions().subscribe(
      data=>{
        this.followedCompetitions = data.data
      },
      ()=>{},
      ()=>{ 
        this.getCompetitionsData()
      }
    )
  }
  getCompetitionsData(){
    this.followedCompetitions.forEach(Competition=>{
      this._global.getSingleCompetition(Competition.id).subscribe(
        data=>{
          this.followedCompetitionsData.push(data.data)
        },
        ()=>{},
        ()=>{}
      )
    })
  }

  unfollowCompetition(id:any){
    this._global.unfollowCompetition({"id":id}).subscribe(
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
