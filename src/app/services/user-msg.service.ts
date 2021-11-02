import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserMsgService {
  private _userMsg$ = new BehaviorSubject<string>('');
  public userMsg$ = this._userMsg$.asObservable();
  
  constructor() { }

  setUserMsg(msg:string) {
    this._userMsg$.next(msg)
    setTimeout(()=>{
      this._userMsg$.next('')
    }, 2000)
  }

  setIngImg(url:string) {
    this._userMsg$.next(url)
  }
}
