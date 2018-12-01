import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { MessageServiceService} from '../message-service.service'
import { DateUtil} from "../utils/Date"

@Component({
  selector: 'app-user2',
  templateUrl: './user2.component.html',
  styleUrls: ['./user2.component.css']
})
export class User2Component implements OnInit {
  subscription = new Subscription();
  message:string;
  messageList= new Array<any>();
  date= new DateUtil();
  constructor(private messageService: MessageServiceService) {
      this.subscription = this.messageService.getMessage().subscribe(
        message => {
          console.log(message.messageObj);
          if(message.messageObj.to === "user2")
            this.messageList.push(message.messageObj);
        }
      )
  }

  ngOnInit() {
  }
  sendMessage(){
    if(this.message!=""){
      let messageObj = {
        data: this.message,
        from: "user2",
        to: "user1",
        date: this.date.newDate()
      }
      this.messageService.sendMessage({
        messageObj
      });
      this.messageList.push(messageObj);
    }
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
