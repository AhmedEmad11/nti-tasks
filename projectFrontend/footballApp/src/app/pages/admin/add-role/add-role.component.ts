import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/providers/services/global.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  
  addRoleForm = this.formBuilder.group({
    name : new FormControl('', [
      Validators.required
    ]),
    permissions : new FormArray([], [Validators.required])
  })

  error = ""
  permissionsData:any[] = []

  constructor(private _global:GlobalService, private router:Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._global.getPermissions().subscribe(
      data=>{
        this.permissionsData = data.data
      },
      ()=>{},
      ()=>{
        this.permissionsData.forEach(perm=>{
          this.addPermission()
        })
      }
    )
  }
  
  get permissions() {
    return this.addRoleForm.get('permissions') as FormArray;
  }

  addPermission() {
    this.permissions.push(new FormControl(false));
  }

  addRole(){
    const permissions = this.addRoleForm.value.permissions
      .map((checked:any, i:number) => checked ? this.permissionsData[i]._id : null)
      .filter((v:any) => v !== null);
    
    if(this.addRoleForm.valid){
      this._global.addRole({"name":this.addRoleForm.value.name, permissions}).subscribe(
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
