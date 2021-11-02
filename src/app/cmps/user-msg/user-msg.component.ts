import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserMsgService } from 'src/app/services/user-msg.service';

@Component({
  selector: 'user-msg',
  templateUrl: './user-msg.component.html',
  styleUrls: ['./user-msg.component.scss']
})
export class UserMsgComponent implements OnInit, OnDestroy {

  msg:{msg:string, class:string}
  subscription:Subscription

  constructor(private userMsgService: UserMsgService) { }

  ngOnInit(): void {
    this.userMsgService.userMsg$.subscribe((msg) => {
      if (msg) this.msg = {msg, class:'show'}
      else {
        this.msg.class = ''
        setTimeout(()=>{this.msg.msg=''},2000)
      }
    });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
