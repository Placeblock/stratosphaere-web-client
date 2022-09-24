import { HttpErrorResponse } from "@angular/common/http"
import { Observable, of } from "rxjs"
import { NotificationService } from "../services/notification.service"


export class ApiEffects {

    
    constructor(
        protected notificationService: NotificationService
    ) {}

    handleError(error: HttpErrorResponse) :Observable<any> {
        console.log("ERROR: ")
        console.log(error)
        this.notificationService.error("Error", error.error["msg"], 5000)
        return of(error)
    }
}