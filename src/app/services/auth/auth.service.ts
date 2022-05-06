import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../helper/helper.service';
import { Router } from '@angular/router';

export interface login{
  access_token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = null
  redirectLink = ''

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private router: Router
  ) { }

  loggedIn(){
    if(this.helper.getToken() && this.helper.getUser()){
      return  true
    }
    else{
      return false
    }
  }

  login(values){
    return this.http.post<login>(
      this.helper.getApiUrl()+'login',
      values,
      {headers: this.helper.header()}
    )
  }

  create(data){
    return this.http.post(
      this.helper.getApiUrl()+'register',
      data,
      {headers: this.helper.header()}
    )
  }

  getUser(){
    return this.http.get(
      this.helper.getApiUrl()+'user',
      {headers: this.helper.header()}
    )
  }

  logout(redirect = null){
    return this.http.get(
      this.helper.getApiUrl()+'logout',
      {headers: this.helper.header()}
    ).subscribe((data) => {
      this.helper.showSuccess(``, 'Successfully Logged out!')
      this.helper.clearStorage()
      if(!redirect){
        this.redirectLink = ''
      }
      else{
        this.redirectLink = '/'+redirect
      }
      this.router.navigate(['auth'])
    })
  }

}
