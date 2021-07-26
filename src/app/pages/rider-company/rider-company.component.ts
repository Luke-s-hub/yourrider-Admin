import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-rider-company',
  templateUrl: './rider-company.component.html',
  styleUrls: ['./rider-company.component.scss']
})
export class RiderCompanyComponent implements OnInit {

  loading:boolean = true
  submit: boolean = false
  companies: any

  companyForm = this.fb.group({
    name: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private http: HttpClient,
    private router: Router
  ) { 
    this.getCompanies()
  }

  ngOnInit(): void {
  }

  getCompanies(){
    this.http.get(
      this.helper.getApiUrl()+'dashboard/get_companies',
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.companies = data.data
      this.loading = false
      console.log('data gotten', data.data)
    })
  }

  delete(id){
    if(window.confirm('Are you sure you want to delete this company?')){
      this.http.get(
        this.helper.getApiUrl()+'dashboard/delete_company/'+id,
        {headers: this.helper.header()}
      ).subscribe((data: any) => {
        this.getCompanies()
        this.helper.showSuccess('', data.message)
      })
    }

  }

  createCompany(){
    this.submit = true
    this.http.post(
      this.helper.getApiUrl()+'dashboard/create_company',
      this.companyForm.value,
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.helper.showSuccess('', data.message)
      this.getCompanies()
      this.submit = false
    })
  }

}
