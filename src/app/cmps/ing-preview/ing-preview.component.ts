import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserMsgService } from 'src/app/services/user-msg.service';

@Component({
  selector: 'ing-preview',
  templateUrl: './ing-preview.component.html',
  styleUrls: ['./ing-preview.component.scss']
})
export class IngPreviewComponent implements OnInit, OnDestroy {
  msg:{url:string, isShow:boolean}={url:'',isShow:false}
  subscription:Subscription
  timer:number
  constructor(private userMsgService:UserMsgService) { }

  ngOnInit(): void {
    this.userMsgService.userMsg$.subscribe((msg) => {
      clearTimeout(this.timer)
      if (msg.substr(0,4)==='http') this.msg = {url:msg, isShow:true}
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  onClose(){
    this.msg={url:'',isShow:false}
  }

  doNothing(ev:MouseEvent){
    ev.stopPropagation()
    ev.preventDefault()
  }
}
