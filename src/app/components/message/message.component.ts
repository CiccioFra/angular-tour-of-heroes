import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy {

  constructor(public messageService: MessageService) { }  //injection 
  // per poter usare un servizio si ignetta nel costruttore
  //  per poter essere usato nell'HTML deve essere PUBLIC

  ngOnInit(): void {
  }

  ngOnDestroy(): void {         //distruzione
    console.log('DashboardComponent noOnInit()');
  }
}
