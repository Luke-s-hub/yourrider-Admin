import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  showModal: boolean = false
  details: any
  riderData: any
  views: any = []
  timeout: any
  companies: any = []
  filterForm = this.fb.group({
    quick: [''],
    date: [''],
    company: [null],
  })

  constructor(
    private fb: FormBuilder,
    public helper: HelperService,
    private http: HttpClient,
    private router: Router
  ) { 
    this.getRiderStats()
    this.getCompany()
    this.filterForm.valueChanges.subscribe((value) => {
      this.filterData()
    })
  }

  ngOnInit(): void {
  }

  getCompany(){
    this.http.get(
      this.helper.getApiUrl()+'dashboard/get_companies',
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.companies = data.data
    })
  }

  getRiderStats(){
    this.http.get(
      this.helper.getApiUrl()+'dashboard/rider',
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.riderData = data.data
      this.views = data.data.all
    })
  }

  activate(id){
    if(window.confirm('Are you sure you want to activate this rider?')){
      this.http.get(
        this.helper.getApiUrl()+'dashboard/user/enable/'+id,
        {headers: this.helper.header()}
      ).subscribe((data: any) => {
        this.getRiderStats()
        this.helper.showSuccess('', data.message)
      })
    }

  }

  deactivate(id){
    if(window.confirm('Are you sure you want to deactivate this rider?')){
      this.http.get(
        this.helper.getApiUrl()+'dashboard/user/disable/'+id,
        {headers: this.helper.header()}
      ).subscribe((data: any) => {
        this.getRiderStats()
        this.helper.showSuccess('', data.message)
      })
    }

  }

  filterData(){
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      let result = this.riderData.all

      if(this.filterForm.value.quick){
        result = result.filter((value) => {
          if(
            (value.user.name).toLowerCase().includes((this.filterForm.value.quick).toLowerCase())
            ||
            (value.user.email).toLowerCase().includes((this.filterForm.value.quick).toLowerCase())
            ){
            return value
          }
        })
      }
      else{
        console.log('no quick')
      }

      if(this.filterForm.value.date){
        result = result.filter((value) => {
          if(new Date(value.user.created_at) == new Date (this.filterForm.value.date)){
            return value
          }
        })
      }
      else{
        console.log('no date')
      }

      if(this.filterForm.value.company){
        result = result.filter((value) => {
          if(value.company_id == this.filterForm.value.company){
            return value
          }
        })
      }
      
      else{
        console.log('no company')
      }

      this.views = result
    }, 1000)
  }

  viewInfo(data){
    this.showModal = true
    this.details = data
    console.log(data)
  }

}
