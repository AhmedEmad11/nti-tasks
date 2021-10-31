import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  })
  
  emailError = ""
  passError = ""
  

  constructor(private _global:GlobalService, private router:Router) { }

  ngOnInit(): void {
  }

  get password(){ return this.loginForm.get("password") }
  get email(){ return this.loginForm.get("email") }

  login(){
    if(this.loginForm.valid){
      this._global.login(this.loginForm.value).subscribe(
        (data)=>{
          localStorage.setItem('token', data.data.token)
          this._global.userData = data.data.user
          this._global.userEmail = data.data.user.email
          this._global.isAuthed = true
          this._global.isAdmin = data.data.isAdmin
          if(data.data.isAdmin){
            localStorage.setItem('isAdmin', "true")
          }
        },
        (err)=>{
          if(err.error.data.includes('email')) this.emailError=err.error.data
          if(err.error.data.includes('password')) this.passError=err.error.data
          
        },
        ()=>{
          this.emailError=""
          this.passError=""
          if(this._global.isAdmin){
            this.router.navigateByUrl('/admin')  
          }
          else this.router.navigateByUrl('/user')

        }//final
      )
    }
  }

}
