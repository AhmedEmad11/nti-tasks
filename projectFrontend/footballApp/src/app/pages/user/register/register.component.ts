import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/providers/services/global.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required, 
      Validators.maxLength(20), 
      Validators.minLength(6)
    ]),
    email: new FormControl('', [
      Validators.required, 
      Validators.email
    ]),
    password: new FormControl('')
  })

  emailError =""


  constructor(
    private _global:GlobalService, 
    private router:Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  get name(){ return this.registerForm.get("name") }
  get email(){ return this.registerForm.get("email") }

  onRegister(){
    
    this._global.register(this.registerForm.value).subscribe(
      ()=>{},
      (err)=>{
        if(err.error.data.includes('email')) this.emailError="email used before"
      },
      ()=>{
        this.emailError=""
        this.toastr.success('Success!', 'registered!');
        setTimeout(()=>{
          this.router.navigateByUrl('/user/login?msg=success')
        },500)
      }//f
    )
  }
}
