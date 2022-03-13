import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.scss']
})
export class CreatorsComponent implements OnInit {

  creatorData: any
  showPhoneModal: boolean = false;
  submitPhone: boolean = false;
  phoneForm = this.fb.group({
    phone: [''],
    id: [''],
  })

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private excelService: ExcelService
  ) { 
    this.getCreatorStats()
  }

  ngOnInit(): void {
  }

  getCreatorStats(){
    this.http.get(
      this.helper.getApiUrl()+'dashboard/user',
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.creatorData = data.data
      console.log('data gotten', data.data)
    })
  }

  activate(id){
    if(window.confirm('Are you sure you want to activate this user?')){
      this.http.get(
        this.helper.getApiUrl()+'dashboard/user/enable/'+id,
        {headers: this.helper.header()}
      ).subscribe((data: any) => {
        this.getCreatorStats()
        this.helper.showSuccess('', data.message)
      })
    }

  }

  deactivate(id){
    if(window.confirm('Are you sure you want to deactivate this user?')){
      this.http.get(
        this.helper.getApiUrl()+'dashboard/user/disable/'+id,
        {headers: this.helper.header()}
      ).subscribe((data: any) => {
        this.getCreatorStats()
        this.helper.showSuccess('', data.message)
      })
    }

  }

  exportData(){
    let data = []
    this.creatorData.all.forEach(element => {
      let temp = {
        'Name' : element.name,
        'Email' : element.email,
        'Phone' : element.phone,
        'Date Registered' : this.helper.formatDate(element.created_at)
      }
      data.push(temp)
    });

    this.excelService.exportAsExcelFile(data, 'User Data');
  }

  updatePhone(id, phone){
    this.phoneForm.get('phone').patchValue(phone)
    this.phoneForm.get('id').patchValue(id)
    this.showPhoneModal = true
  }

  processPhone(){
    this.submitPhone = true
    this.http.post(
      this.helper.getApiUrl()+'dashboard/user/update/phone/'+this.phoneForm.value.id,
      {phone: this.phoneForm.value.phone},
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.submitPhone = false;
      this.helper.showSuccess('Success', data.message)
      this.getCreatorStats()
    })
  }
}
