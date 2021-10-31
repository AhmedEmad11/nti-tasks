import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-follow-player',
  templateUrl: './follow-player.component.html',
  styleUrls: ['./follow-player.component.css']
})
export class FollowPlayerComponent implements OnInit {

  followPlayerForm = new FormGroup({
    id : new FormControl('', [
      Validators.required
    ])
  })

  players:any[] = []

  error = ""

  constructor(private _global:GlobalService, private router:Router) { }

  ngOnInit(): void {
    this._global.getAllPlayers().subscribe(
      data=>{
        this.players = data.data
      },
      (err)=>{ this.error = err.error.data},
      ()=>{}
      )
  }
  
  followPlayer(){
    if(this.followPlayerForm.valid){
      this._global.followPlayer(this.followPlayerForm.value).subscribe(
        (data)=>{},
        (err)=>{
          this.error = err
        },
        ()=>{
          this.router.navigateByUrl('/user/players')
        }//final
      )
    }
  }

}
