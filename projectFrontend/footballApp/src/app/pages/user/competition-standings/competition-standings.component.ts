import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-competition-standings',
  templateUrl: './competition-standings.component.html',
  styleUrls: ['./competition-standings.component.css']
})
export class CompetitionStandingsComponent implements OnInit {
  @Input() compId:string = ""

  followedCompetitionsStandings:any[] = []

  constructor(private _global:GlobalService) { }

  ngOnInit(): void {
    this.getStandings(this.compId)
  }

  getStandings(id:string){
    this._global.getStandings(id).subscribe(
      data=>{
        this.followedCompetitionsStandings = data.standings[0].table
      },
      ()=>{},
      ()=>{}
    )
  }
}
