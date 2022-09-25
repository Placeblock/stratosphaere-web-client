import { HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { NotificationService } from "./notification.service";


export class ApiService {
  headers = new HttpHeaders({'Content-Type' : 'application/json'});
  apiUrl = environment.baseUrl + environment.apiVersion

  constructor(
    private notificationService: NotificationService) {

  }

  handleError(error: any) {
    console.log("handle error")
    this.notificationService.error("Error", error?.error["msg"], 5000)
    return throwError(() => {
      return error
    })
  }
}

export interface APIResponse<D> {
  code: number,
  msg: string,
  data: D
}