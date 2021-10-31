import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-competitions-news',
  templateUrl: './competitions-news.component.html',
  styleUrls: ['./competitions-news.component.css']
})
export class CompetitionsNewsComponent implements OnInit {

  followedCompetitionsNews:any[] = []
  newsFound:boolean = false

  constructor(private _global:GlobalService, private router:Router) { }

  ngOnInit(): void {
    this._global.getFollowedCompetitionsNews().subscribe(
      data=>{
        this.followedCompetitionsNews = data.data
        if(this.followedCompetitionsNews[0] == []) this.newsFound = true
      },
      ()=>{},
      ()=>{}
    )
  }

}
