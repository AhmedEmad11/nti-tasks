import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-add-permission-to-role',
  templateUrl: './add-permission-to-role.component.html',
  styleUrls: ['./add-permission-to-role.component.css']
})
export class AddPermissionToRoleComponent implements OnInit {

  addPermissionToRoleForm = new FormGroup({
    role : new FormControl('', [
      Validators.required
    ]),
    permission : new FormControl('', [
      Validators.required
    ])
  })

  error = ""

  constructor(private _global:GlobalService, private router:Router) { }

  ngOnInit(): void {
  }
  
  addPermissionToRole(){
    if(this.addPermissionToRoleForm.valid){
      this._global.addPermissionToRole(this.addPermissionToRoleForm.value).subscribe(
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
