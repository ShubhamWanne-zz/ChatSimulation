import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import {MessageServiceService} from '../message-service.service'
@Component({
  selector: 'app-user2',
  templateUrl: './user2.component.html',
  styleUrls: ['./user2.component.css']
})
export class User2Component implements OnInit {
  subscription = new Subscription();
  message:string;
  messageList: string[];
  constructor(private messageService: MessageServiceService) {
      this.subscription = this.messageService.getMessage().subscribe(
        message => {
          console.log(message)
          if(message.to === "user2")
            this.messageList.push(message.data);
        }
      )
  }

  ngOnInit() {
  }
  sendMessage(){
      if(this.message != ""){
      this.messageService.sendMessage({
        data: this.message,
        to: "user1"
      });
    }
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
