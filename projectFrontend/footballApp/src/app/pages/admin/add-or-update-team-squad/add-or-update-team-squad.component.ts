import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-add-or-update-team-squad',
  templateUrl: './add-or-update-team-squad.component.html',
  styleUrls: ['./add-or-update-team-squad.component.css']
})
export class AddOrUpdateTeamSquadComponent implements OnInit {

  allTeams :any = []

  constructor(private _global:GlobalService, private router:Router, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getAllTeams()
  }
  
  getAllTeams(){
    this._global.getAllTeams().subscribe(
      (data)=>{
        this.allTeams = data.data
      },
      ()=>{},
      ()=>{}
    )
  }

  addOrUpdateTeamSquad(id:string){
    this._global.addOrUpdateTeamSquad(id).subscribe(
      data=>{},
      (err)=>{
        this.toastr.warning('', 'api request limit reached')
      },
      ()=>{
        this.toastr.success('', 'team squad added successfully')
      }
    )
  }
}
