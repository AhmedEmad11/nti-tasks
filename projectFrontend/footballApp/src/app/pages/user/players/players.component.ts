import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  followedPlayers:any[] = [] 
  followedPlayersData:any[] = []
  constructor(private _global:GlobalService, private router:Router) { }

  ngOnInit(): void {
    this.getFollowedPlayers()
  }
  getFollowedPlayers(){
    this._global.followedPlayers().subscribe(
      data=>{
        this.followedPlayers = data.data
      },
      ()=>{},
      ()=>{ this.getPlayersData()}
    )
  }
  getPlayersData(){
    this.followedPlayers.forEach(player=>{
      this._global.getSinglePlayer(player.id).subscribe(
        data=>{
          this.followedPlayersData.push(data.data)
        },
        ()=>{},
        ()=>{}
      )
    })
  }

  unfollowPlayer(id:any){
    this._global.unfollowPlayer({"id":id}).subscribe(
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
