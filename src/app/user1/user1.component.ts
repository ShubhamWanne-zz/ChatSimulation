import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from '../message-service.service'
import { Subscription } from 'rxjs'
import { DateUtil } from "../utils/Date"
@Component({
  selector: 'app-user1',
  templateUrl: './user1.component.html',
  styleUrls: ['./user1.component.css']
})
export class User1Component implements OnInit {
  subscription: Subscription;
  message:string;
  messageList= new Array<any>();
  date= new DateUtil();
  constructor(private messageService: MessageServiceService) {
    this.subscription = this.messageService.getMessage().subscribe(
      message => {
        console.log(message.messageObj);
        if(message.messageObj.to === "user1")
          this.messageList.push(message.messageObj);
      }
    )
  }

  sendMessage(){
    if(this.message!=""){
      let messageObj = {
        data: this.message,
        from: "user1",
        to: "user2",
        date: this.date.newDate()
      }
      this.messageService.sendMessage({
        messageObj
      });
      this.messageList.push(messageObj);
    }
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
