import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-players-news',
  templateUrl: './players-news.component.html',
  styleUrls: ['./players-news.component.css']
})
export class PlayersNewsComponent implements OnInit {

  followedPlayersNews:any[] = []
  newsFound:boolean = false
  constructor(private _global:GlobalService, private router:Router) { }

  ngOnInit(): void {
    this._global.getFollowedPlayersNews().subscribe(
      data=>{
        this.followedPlayersNews = data.data
        if(this.followedPlayersNews[0] == []) this.newsFound = true
      },
      ()=>{},
      ()=>{}
    )
  }
}
