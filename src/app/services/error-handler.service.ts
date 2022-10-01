import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { NotificationService } from "./notification.service";

@Injectable({
providedIn: 'root'
})
export class ErrorHandlerService {
    constructor(
    private notificationService: NotificationService) {}

    handleError(error: any) {
        console.error(error)
        this.notificationService.error("Error", error?.error["msg"], 5000)
    }
}