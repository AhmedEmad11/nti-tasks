import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _global:GlobalService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if(this._global.dataApi){
      request = request.clone({
        headers: request.headers.set('X-Auth-Token', 'f93e5149c97944e3875973abcf71a4b6')
      })
    }
    
    this._global.backend
    const token = localStorage.getItem('token')
    if(token && this._global.backend){
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
      this._global.isAuthed = true
    }
    return next.handle(request);
  }
}
