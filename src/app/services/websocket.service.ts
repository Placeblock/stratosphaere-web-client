import { Injectable } from '@angular/core';
import { catchError, retry, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
import { WSMessage } from '../classes/wsmessage';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<{"data": any, "action":string} | null> | null = null;
  private messagesSubject$ = new Subject<{"data": any, "action":string} | null>();
  public messages$ = this.messagesSubject$.pipe(catchError(e => { throw e }));

  constructor(private notificationService: NotificationService) {}

  public connect(): void {
    console.log("CONNECTING TO WEBSOCKET")
    this.notificationService.info("WebSocket", "Trying to connect to Server", 5000);
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      this.socket$.pipe(
        catchError((err, obs) => {
          this.notificationService.error("WebSocket Error", "Trying to reconnect...", 5000);
          console.log(err);
          return obs;
        }),
        retry({delay: 2000})
      ).subscribe(message => {
        this.messagesSubject$.next(message);
      })
    }
  }

  getNewWebSocket(): WebSocketSubject<{"data": any, "action":string} | null> {
    return webSocket({
      url: environment.websocketUrl,
      closeObserver: {
        next: () => {
          this.notificationService.error("WebSocket Error", "Lost connection to Server", 5000);
        }
      },
      openObserver: {
        next: () => {
          this.notificationService.success("WebSocket", "Connected to Server", 5000);
        }
      },
      deserializer: ({data}) => {
        if (!("action" in data) || !("data" in data) || !(typeof data.action == "string")) {
          return null;
        }
        return data as {"data": any, "action":string};
      } 
    })
  }
}
