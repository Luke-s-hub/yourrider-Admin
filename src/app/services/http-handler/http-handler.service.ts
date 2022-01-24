import { Injectable } from '@angular/core';
import {throwError as observableThrowError} from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpEvent, HttpInterceptor,
  HttpHandler, HttpRequest,
  HttpErrorResponse }
  from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerService {

  constructor(
    private helper: HelperService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${this.helper.getToken()}`,
      },
    });
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          switch(error.status){
            case 0:
              return this.showError(error.statusText)
            case 500:
              return this.showError(error)
            case 404:
              return this.showError(error)
            case 400:
              return this.showError(error)
            case 401:
              this.helper.showError('', 'Please login to continue')
              this.helper.clearStorage()
              this.router.navigate(['auth'])
              return throwError(error.error.message)
            case 422:
              return this.showFormError(error)
            default:
              return this.showError(error)
          }
          // if (error.error instanceof ErrorEvent) {
          //   console.log('this is client side error');
          //   console.log(error)
          // }
          // else {
          //   switch(error.status){
          //     case 500:
          //       return this.showError(error)
          //     case 404:
          //       return this.showError(error)
          //     case 400:
          //       return this.showError(error)
          //     case 401:
          //       this.helper.showError('', 'Please login to continue')
          //       window.localStorage.clear()
          //       this.router.navigate(['auth'])
          //       return throwError(error.error.message);
          //     default:
          //       return this.showError(error)
          //   }

          // }

        })
      )
  }

  showError(error){
    console.log('this is server side error');
    console.log(error)
    if(error.error){
      this.helper.showError(JSON.stringify(error.error.errors), error.error.message)
    }
    return throwError(error.error.message);
  }

  showFormError(error){
    console.log('this is server side error');
    console.log(error)
    if(error.error){
      this.helper.showError(Object.values(error.error.errors)[0], error.error.message)
    }
    return throwError(error.error.message);
  }

}
