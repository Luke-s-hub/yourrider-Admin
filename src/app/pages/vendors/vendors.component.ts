import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  loading: boolean = true
  showModal: boolean = false
  showCreditModal: boolean = false
  showDebitModal: boolean = false
  details: any
  riderData: any
  views: any = []
  timeout: any
  companies: any = []

  submitCredit: boolean = false
  submitDebit: boolean = false

  showPhoneModal: boolean = false;
  submitPhone: boolean = false;
  phoneForm = this.fb.group({
    phone: [''],
    id: [''],
  })

  filterForm = this.fb.group({
    quick: [''],
    date: [''],
    company: [null],
  })

  creditForm = this.fb.group({
    amount: [''],
  })

  debitForm = this.fb.group({
    amount: [''],
  })

  constructor(
    private fb: FormBuilder,
    public helper: HelperService,
    private http: HttpClient,
    private router: Router,
    private excelService: ExcelService
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
      console.log(data)
      this.riderData = data.data
      this.views = data.data.all
      this.loading = false;
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

  getTokenBalance(data){
    let credit = 0
    let debit = 0
    if(data || data.length > 0){
      data.forEach(element => {
        credit += element.credit
        debit += element.debit
      });
      return (credit - debit).toLocaleString()
    }
    else{
      return 0
    }
  }

  credit(){
    this.showModal = false
    this.showCreditModal = true
  }

  debit(){
    this.showModal = false
    this.showDebitModal = true
  }

  processCredit(){
    if(!this.creditForm.value.amount || this.creditForm.value.amount < 1){
      return this.helper.showWarning('', 'Invalid amount')
    }
    let user = this.details.user.id
    let amount = this.creditForm.value.amount
    this.submitCredit = true
    this.http.get(
      this.helper.getApiUrl()+'payment/credit_token/'+user+'/'+amount,
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.submitCredit = false;
      this.helper.showSuccess(this.details.user.name, data.message)
      this.getRiderStats()
      this.showCreditModal = false
    })
  }

  processDebit(){
    if(!this.debitForm.value.amount || this.debitForm.value.amount < 1){
      return this.helper.showWarning('', 'Invalid amount')
    }
    let user = this.details.user.id
    let amount = this.debitForm.value.amount
    this.submitDebit = true
    this.http.get(
      this.helper.getApiUrl()+'payment/debit_token/'+user+'/'+amount,
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.submitDebit = false;
      this.helper.showSuccess(this.details.user.name, data.message)
      this.getRiderStats()
      this.showDebitModal = false
    })
  }

  exportData(){
    let data = []
    this.views.forEach(element => {
      let temp = {
        'Name' : element.user.name,
        'Email' : element.user.email,
        'Phone' : element.user.phone,
        'Company' : element.company.name,
        'Company ID' : element.code.code,
        'Pending Payout' : this.getTokenBalance(element.user.token),
        'Date Registered' : this.helper.formatDate(element.user.created_at)
      }
      data.push(temp)
    });

    this.excelService.exportAsExcelFile(data, 'Rider Data');
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
      this.getRiderStats()
    })
  }
}
