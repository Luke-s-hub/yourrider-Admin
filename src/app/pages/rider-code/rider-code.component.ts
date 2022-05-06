import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-rider-code',
  templateUrl: './rider-code.component.html',
  styleUrls: ['./rider-code.component.scss']
})
export class RiderCodeComponent implements OnInit {

  loading:boolean = true
  submit: boolean = false
  codeData: any
  company: any

  codeForm = this.fb.group({
    company_id: [null, [Validators.required]],
    code: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private http: HttpClient,
    private router: Router,
    private excelService: ExcelService
  ) { 
    this.getCodeStats()
    this.getCompany()
  }

  ngOnInit(): void {
  }

  getCompany(){
    this.http.get(
      this.helper.getApiUrl()+'company/approved',
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.company = data.data
      console.log('data gotten', data.data)
    })
  }

  getCodeStats(){
    this.http.get(
      this.helper.getApiUrl()+'dashboard/get_rider_codes',
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.codeData = data.data
      this.loading = false
      console.log('data gotten', data.data)
    })
  }

  delete(id){
    if(window.confirm('Are you sure you want to delete this code?')){
      this.http.get(
        this.helper.getApiUrl()+'dashboard/delete_code/'+id,
        {headers: this.helper.header()}
      ).subscribe((data: any) => {
        console.log(data)
        this.getCodeStats()
        this.helper.showSuccess('', data.message)
      })
    }

  }

  createCode(){
    this.submit = true
    this.http.post(
      this.helper.getApiUrl()+'dashboard/create_code',
      this.codeForm.value,
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.helper.showSuccess('', data.message)
      this.getCodeStats()
      this.submit = false
    })
  }

  exportData(){
    let data = []
    this.codeData.all.forEach(element => {
      let temp = {
        'Code' : element.code,
        'Company' : element.company.name,
        'Status' : element.status? 'Active' : 'Inactive',
        'Date Registered' : this.helper.formatDate(element.created_at)
      }
      data.push(temp)
    });

    this.excelService.exportAsExcelFile(data, 'Rider Identification Codes');
  }

}
