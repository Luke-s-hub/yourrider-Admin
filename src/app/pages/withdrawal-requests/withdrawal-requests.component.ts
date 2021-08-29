import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { ExcelService } from 'src/app/services/excel.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-withdrawal-requests',
  templateUrl: './withdrawal-requests.component.html',
  styleUrls: ['./withdrawal-requests.component.scss']
})
export class WithdrawalRequestsComponent implements OnInit {


  views: any = []
  timeout: any
  requests: any = []
  loading: boolean = true
  pending: number;
  approved:number;
  declined:number;
  approving: boolean = false

  filterForm = this.fb.group({
    date: [''],
    status: [null],
  })

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    public helper: HelperService,
    private http: HttpClient,
    private excelService: ExcelService
    ) { 
      this.filterForm.valueChanges.subscribe((value) => {
        this.filterData()
      })
    }

  ngOnInit(): void {
    this.getRequests()
  }

  getRequests(){
    this.http.get(
      this.helper.getApiUrl()+'dashboard/get_withdrawal_requests',
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      console.log(data)
      this.requests = data.data
      this.views = data.data
      this.pending = data.pending
      this.approved = data.approved
      this.declined = data.declined
      this.loading = false
    })
  }

  filterData(){
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      let result = this.requests
      if(this.filterForm.value.date){
        result = result.filter((value) => {

        console.log(new Date(value.date), new Date (this.filterForm.value.date))
          if(this.helper.formatDate(value.date) == this.helper.formatDate(this.filterForm.value.date)){
            return value
          }
        })
      }
      else{
        console.log('no date')
      }

      if(this.filterForm.value.status){
        result = result.filter((value) => {
          if(value.status == this.filterForm.value.status){
            return value
          }
        })
      }
      else{
        console.log('no status')
      }

      this.views = result
    }, 1000)
  }

  exportData(){
    let data = []
    this.views.forEach(element => {
      let temp = {
        'Full Name' : element.user.name,
        'Email' : element.user.email,
        'Amount (NGN)' : element.amount,
        'Current Balance' : element.balance,
        'Bank Name' : element.bank_details.bank_name,
        'Acoount Number' : element.bank_details.account_number,
        'Acoount Name' : element.bank_details.account_name,
        'status' : element.status,
        'Date Requested' : this.helper.formatDate(element.created_at)
      }
      data.push(temp)
    });

    this.excelService.exportAsExcelFile(data, 'Withdrawal Requests');
  }

  approve(id){
    if(window.confirm('Are you sure you want to approve this request?')){
      this.approving = true
      this.http.get(
        this.helper.getApiUrl()+'dashboard/approve_withdrawal_request/'+id,
        {headers: this.helper.header()}
      ).subscribe((data: any) => {
        this.approving = false
        this.getRequests()
        this.helper.showSuccess('', data.message)
      }, error => {
        this.approving = false
      })
    }
  }

  decline(id){
    if(window.confirm('Are you sure you want to decline this request?')){
      this.approving = true
      this.http.get(
        this.helper.getApiUrl()+'dashboard/decline_withdrawal_request/'+id,
        {headers: this.helper.header()}
      ).subscribe((data: any) => {
        this.approving = false
        this.getRequests()
        this.helper.showSuccess('', data.message)
      }, error => {
        this.approving = false
      })
    }
  }
}
