import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.css']
})
export class AddPermissionComponent implements OnInit {

  addPermissionForm = new FormGroup({
    name : new FormControl('', [
      Validators.required
    ]),
    description : new FormControl('', [
      Validators.required
    ])
  })

  error = ""

  constructor(private _global:GlobalService, private router:Router) { }

  ngOnInit(): void {
  }
  
  addPermission(){
    if(this.addPermissionForm.valid){
      this._global.addPermission(this.addPermissionForm.value).subscribe(
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
