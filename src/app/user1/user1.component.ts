import { Component, OnInit } from '@angular/core';
import { MessageServiceService } from '../message-service.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-user1',
  templateUrl: './user1.component.html',
  styleUrls: ['./user1.component.css']
})
export class User1Component implements OnInit {
  subscription: Subscription;
  message:string;
  messageList: string[];

  constructor(private messageService: MessageServiceService) {
    this.subscription = this.messageService.getMessage().subscribe(
      message => {
        console.log(message);
        if(message.to === "user1")
          this.messageList.push(message.data);
      }
    )
  }

  sendMessage(){
    if(this.message!=""){
      this.messageService.sendMessage({
        data: this.message,
        to: "user2"
      });
    }
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
