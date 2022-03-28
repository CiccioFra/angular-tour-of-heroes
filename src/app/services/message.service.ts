import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  //aggiungiamo manualmente
  // injection dentro heros -> vado nel hero.service.ts
  //   e passo come parametri al costruttore: "private messageService: MessageService"
  messages: string[] = [];

  constructor() { }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = []; //definisco arrey che conterrà i mesasggi
  }
}

