import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-add-or-update-competition',
  templateUrl: './add-or-update-competition.component.html',
  styleUrls: ['./add-or-update-competition.component.css']
})
export class AddOrUpdateCompetitionComponent implements OnInit {

  allComps :any = {}

  constructor(private _global:GlobalService, private router:Router) { }

  ngOnInit(): void {
    this.getAllCompetitionsApi()
  }
  
  getAllCompetitionsApi(){
    this._global.getAllCompetitionsApi().subscribe(
      (data)=>{
        this.allComps = data
      },
      ()=>{},
      ()=>{}
    )
  }

  addOrUpdateCompetition(id:string){
    this._global.addOrUpdateCompetition(id).subscribe(
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
  
  addOrUpdateCompetitionTeams(id:string){
    this._global.addOrUpdateCompetitionTeams(id).subscribe(
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
