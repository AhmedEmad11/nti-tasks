import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-show-one-competition',
  templateUrl: './show-one-competition.component.html',
  styleUrls: ['./show-one-competition.component.css']
})
export class ShowOneCompetitionComponent implements OnInit {

  comp:any
  compId:string =""
  compMatches:any[] = []
  nextMatchDay:any
  noMatches:boolean = false

  constructor(private _global:GlobalService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.compId = params.id
    });
    this.showCompetition(this.compId)
  }

  showCompetition(id:string){
    this._global.getSingleCompetition(id).subscribe(
      data=>{
        this.comp = data.data
        this.nextMatchDay = parseInt(this.comp.currentSeason.currentMatchday) + 2
      },
      ()=>{},
      ()=>{
        this.getCompMatches(this.compId, `${this.nextMatchDay}`)
      }
    )
  }

  getCompMatches(id:string, matchday:string){
    this._global.getCompMatches(id, matchday).subscribe(
      data=>{
        this.compMatches = data.matches
        if(this.compMatches.length == 0){
          this.noMatches = true
        }
      }
    )
  }
}
