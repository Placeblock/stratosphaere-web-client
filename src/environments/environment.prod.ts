import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  requestHeaders: new HttpHeaders({'Content-Type' : 'application/json'}),
  baseUrl: 'https://stratosphaere.codelix.de/api/v1',
  websocketUrl: 'wss://stratosphaere.codelix.de/wss'
};
