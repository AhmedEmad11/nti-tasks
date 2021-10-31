import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-follow-team',
  templateUrl: './follow-team.component.html',
  styleUrls: ['./follow-team.component.css']
})
export class FollowTeamComponent implements OnInit {

  followTeamForm = new FormGroup({
    id : new FormControl('', [
      Validators.required
    ])
  })

  teams:any[] = []

  error = ""

  constructor(private _global:GlobalService, private router:Router) { }

  ngOnInit(): void {
    this._global.getAllTeams().subscribe(
      data=>{
        this.teams = data.data
      },
      (err)=>{ this.error = err.error.data},
      ()=>{}
      )
  }
  
  followTeam(){
    if(this.followTeamForm.valid){
      this._global.followTeam(this.followTeamForm.value).subscribe(
        (data)=>{},
        (err)=>{
          this.error = err
        },
        ()=>{
          this.router.navigateByUrl('/user/teams')
        }//final
      )
    }
  }
}
