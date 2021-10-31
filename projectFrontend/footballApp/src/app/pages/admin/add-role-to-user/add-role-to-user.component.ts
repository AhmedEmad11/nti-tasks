import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-add-role-to-user',
  templateUrl: './add-role-to-user.component.html',
  styleUrls: ['./add-role-to-user.component.css']
})
export class AddRoleToUserComponent implements OnInit {

  addRoleToUserForm = new FormGroup({
    email : new FormControl('', [
      Validators.required
    ]),
    role : new FormControl('', [
      Validators.required
    ])
  })

  roles:any[] = []

  error = ""

  constructor(private _global:GlobalService, private router:Router) { }

  ngOnInit(): void {
    this._global.getRoles().subscribe(
      (data)=>{
        this.roles = data.data
      },
      (err)=>{
        this.error = err.error.data
      },
      ()=>{
        
      }//final
    )
  }
  
  addRoleToUser(){
    if(this.addRoleToUserForm.valid){
      this._global.addRoleToUser(this.addRoleToUserForm.value).subscribe(
        (data)=>{},
        (err)=>{
          this.error = err
        },
        ()=>{
          this.router.navigateByUrl('/admin')
        }//final
      )
    }
  }
}
