import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements  CanActivate {
  constructor(public _global:GlobalService, private  _router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean { 
    if(localStorage.getItem("isAdmin") != "true"){
      this._router.navigateByUrl('/user')
      return false
    }

    return true;
  }
}
