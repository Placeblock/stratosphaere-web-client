import { HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";


export class ApiService {
  headers = new HttpHeaders({'Content-Type' : 'application/json'});
  apiUrl = environment.baseUrl + environment.apiVersion

  handleError(error: any) {
    console.log(error)
    return throwError(() => {
      return error
    })
  }
}

export interface APIResponse<D> {
  token: string;
  code: number,
  msg: string,
  data: D
}