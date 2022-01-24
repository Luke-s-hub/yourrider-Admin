import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    private toastrService: ToastrService,
    @Inject(PLATFORM_ID) private platformId: any,
    private matDialog: MatDialog,
  ) {
  }

  header() {

    let headers = new HttpHeaders();
    // //headers.set('content-type', 'application/json');
    // headers.set('Accept', 'application/json');
    // let token = this.getToken();
    // if (token) {
    //   alert('there is token')
    //   headers.set('Authorization', 'Bearer ' + token);
    // }
    return headers
  }

  getApiUrl(){
    return environment.api.url
  }

  getApiImageLink(){
    return environment.api.imageUrl
  }

  formatDate(value){

    // Months array
    let months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    // Convert timestamp to milliseconds
    let date = new Date(value);

    // Year
    let year = date.getFullYear();

    // Month
    let month = months_arr[date.getMonth()];

    // Day
    let day = date.getDate();

    // Display date time in MM-dd-yyyy h:m:s format
    let convdataTime = day+' '+month+', '+year;

    return convdataTime

  }

  formatTime(value){
    // Convert timestamp to milliseconds
    let now = new Date()
    let date = new Date(value);

    let day = date.getDate();
    let year = date.getFullYear().toString().substr(-2);
    let month = date.getMonth();
    let hours = date.getHours();
    let mins = date.getMinutes();

    return day+ '/' +month+ '/' +year+ ' ' +hours+':'+mins+(hours > 11? 'PM':'AM')
  }

  cutText(name, chars){
    return (name.length > chars)? name.substr(0, chars)+'...': name
  }

  public showSuccess(message, title) {
    this.toastrService.success(message, title);
  }

  public showError(message, title) {
    this.toastrService.error(message, title);
  }

  public showInfo(message, title) {
    this.toastrService.info(message, title);
  }

  public showWarning(message, title) {
    this.toastrService.warning(message, title);
  }

  confirm(title){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title: title,
    };
    dialogConfig.autoFocus = false;
    let dialogRef = this.matDialog.open(ConfirmComponent, dialogConfig);
    return dialogRef

  }

  clearStorage(){
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.clear()
    }
  }

  getToken(){
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage.hasOwnProperty("token")? window.localStorage.getItem('token'): '';
    }
    else{
      return ''
    }
  }

  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem('token', token);
    }
  }

  getUser(){
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage.hasOwnProperty("user")? JSON.parse(window.localStorage.getItem('user')) : [];
    }
    else{
      return ''
    }
  }

  setUser(user): void {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage.setItem('user', JSON.stringify(user));
    }
  }

  get getFullName(){
    return this.getUser().first_name+' '+this.getUser().last_name
  }

  get getLastName(){
    return this.getUser().last_name
  }



}
