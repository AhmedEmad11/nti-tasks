import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  allTeams:any[] = []
  
  constructor(public _global:GlobalService) { }

  ngOnInit(): void {
    this.getAllTeams()
  }


  getAllTeams(){
    this._global.getAllTeams().subscribe(data=>{
      this.allTeams = data.data
    })
  }

}
