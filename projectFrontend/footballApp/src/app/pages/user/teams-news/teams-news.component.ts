import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-teams-news',
  templateUrl: './teams-news.component.html',
  styleUrls: ['./teams-news.component.css']
})
export class TeamsNewsComponent implements OnInit {

  followedTeamsNews:any[] = []
  newsFound:boolean = false

  constructor(private _global:GlobalService, private router:Router) { }

  ngOnInit(): void {
    this._global.getFollowedTeamsNews().subscribe(
      data=>{
        this.followedTeamsNews = data.data
        if(this.followedTeamsNews[0] != []) this.newsFound = true
      },
      ()=>{},
      ()=>{}
    )
  }
}
