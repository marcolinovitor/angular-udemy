import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NotificationsService {

  notifier = new EventEmitter<any>()

  notify(message: string){
    this.notifier.emit(message)
  }

  constructor() { }

}
