import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { ExcelService } from 'src/app/services/excel.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  showModal: boolean = false
  details: any
  views: any = []
  timeout: any
  orders: any = []
  loading: boolean = true
  pending: number;
  count: number;
  accepted:number;
  picked:number;
  delivered:number;
  riderData: any = []
  company: any = []

  filterForm = this.fb.group({
    date: [''],
    company: [null],
    payment_type: [null],
    delivery_type: [null],
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
    this.getCompany()
    this.getOrders()
  }

  getCompany(){
    this.http.get(
      this.helper.getApiUrl()+'dashboard/get_companies',
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.company = data.data
    })
  }

  getOrders(){
    this.http.get(
      this.helper.getApiUrl()+'order',
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.orders = data.data.all.data
      this.views = data.data.all.data
      this.accepted = data.data.accepted
      this.picked = data.data.picked
      this.delivered = data.data.delivered
      this.pending = data.data.pending
      this.count = data.data.count
      console.log('data gotten', data.data)
      this.loading = false
    })
  }

  filterData(){
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      let result = this.orders
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
      if(this.filterForm.value.payment_type){
        result = result.filter((value) => {
          if(value.paymentType == this.filterForm.value.payment_type){
            return value
          }
        })
      }
      else{
        console.log('no paymentType')
      }
      
      if(this.filterForm.value.delivery_type){
        result = result.filter((value) => {
          if(value.deliveryType == this.filterForm.value.delivery_type){
            return value
          }
        })
      }
      else{
        console.log('no deliveryType')
      }

      if(this.filterForm.value.company){
        result = result.filter((value) => {
          if(value.company == this.filterForm.value.company){
            return value
          }
        })
      }
      else{
        console.log('no company set')
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

  view(data){
    console.log(data)
    this.showModal = true
    this.details = data
  }

  exportData(){
    let data = []
    this.views.forEach(element => {
      let temp = {
        'Pickup Location' : element.pickup.result.description,
        'Number of Packages' : element.packages.length,
        'Amount (NGN)' : element.amount,
        'Delivery Type' : element.deliveryType,
        'Payment Type' : element.paymentType,
        'Rider' : element.rider_name,
        'Company' : element.company,
        'status' : element.status,
        'Date Registered' : this.helper.formatDate(element.date)
      }
      data.push(temp)
    });

    this.excelService.exportAsExcelFile(data, 'Orders');
  }
}
