import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-follow-competition',
  templateUrl: './follow-competition.component.html',
  styleUrls: ['./follow-competition.component.css']
})
export class FollowCompetitionComponent implements OnInit {

  followCompetitionForm = new FormGroup({
    id : new FormControl('', [
      Validators.required
    ])
  })

  competitions:any[] = []

  error = ""

  constructor(private _global:GlobalService, private router:Router) { }

  ngOnInit(): void {
    this._global.getAllCompetitions().subscribe(
      data=>{
        this.competitions = data.data
      },
      (err)=>{ this.error = err.error.data},
      ()=>{}
      )
  }
  
  followCompetition(){
    if(this.followCompetitionForm.valid){
      this._global.followCompetition(this.followCompetitionForm.value).subscribe(
        (data)=>{},
        (err)=>{
          this.error = err
        },
        ()=>{
          this.router.navigateByUrl('/user/competitions')
        }//final
      )
    }
  }

}
