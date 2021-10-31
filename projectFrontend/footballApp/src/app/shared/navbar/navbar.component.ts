import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public _global:GlobalService, private router:Router) {}
  user:any
  
  ngOnInit(): void {
    this._global.profile().subscribe(
      data=>{
        this._global.userData = data.data
        this.user = data.data
        this._global.isAuthed = true
        if(data.isAdmin){
          localStorage.setItem('isAdmin', "true")
        }
      },
      ()=>{},
      ()=>{}
    )
  }
  
  logout(){
    this._global.logout().subscribe(
      (data)=>{
        localStorage.removeItem('token')
        if(localStorage.getItem('isAdmin')){
          localStorage.removeItem('isAdmin')
        }
        this._global.isAuthed =false
      },
      ()=>{},
      ()=>{
        this.router.navigateByUrl('/login')
      }
    )
  }

}
