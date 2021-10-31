import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-show-all-competitions',
  templateUrl: './show-all-competitions.component.html',
  styleUrls: ['./show-all-competitions.component.css']
})
export class ShowAllCompetitionsComponent implements OnInit {
  allComps :any[] = []
  isAdmin :boolean = false

  constructor(private _global:GlobalService, private router:Router) { }

  ngOnInit(): void {
    this._global.getAllCompetitions().subscribe(
      data=>{
        this.allComps = data.data
      },
      ()=>{},
      ()=>{}
    )
    if(localStorage.getItem("isAdmin") == "true"){
      this.isAdmin = true
    }
  }

  deleteCompetition(id:string){
    this._global.deleteCompetition(id).subscribe(
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
