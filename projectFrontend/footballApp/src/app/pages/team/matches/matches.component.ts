import { Component, Input, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  @Input() teamId:any =""

  teamMatches:any[] = []
  noMatches:boolean = false

  today :Date = new Date()
  nextWeek = new Date(this.today.getTime() + 7 * 24 * 60 * 60 * 1000)

  todayString = this.today.toISOString().split('T')[0]
  nextWeekString = this.nextWeek.toISOString().split('T')[0]

  constructor(private _global:GlobalService) { }

  ngOnInit(): void {
    this.getTeamMatches(this.teamId, this.todayString, this.nextWeekString)
  }

  getTeamMatches(id:string, dateNow:string, dateNextWeek:string){
    this._global.getTeamMatches(id, dateNow, dateNextWeek).subscribe(
      (data:any)=>{
        this.teamMatches = data.matches
        if(this.teamMatches.length == 0) this.noMatches = true
      }
    )
  }

}
