import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loaded = false
  permissions:any[] = []
  
  constructor(private _global:GlobalService) {}

  ngOnInit(): void {
    this._global.getPermissions().subscribe(
      (data)=>{
        this.permissions = data.data
      },
      ()=>{},
      ()=>{
        this.loaded = true
      }//final
    )
  }

}
