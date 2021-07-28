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
  customer : any
  rider : any
  orders: any = []
  loading: boolean = true
  pending: number;
  accepted_picked:number;
  completed_confirmed:number;

  filterForm = this.fb.group({
    date: [''],
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
    this.getOrders()
  }

  getOrders(){
    this.afs.collection('orders').get().subscribe((result:any) => {
      let orders = []
      let pending = 0
      let accepted_picked = 0
      let completed_confirmed = 0
      result.forEach(element => {
        let order = element.data()
        if(order.status == 'pending'){
          pending++
        }
        if(order.status == 'accepted' || order.status == 'picked'){
          accepted_picked++
        }
        if(order.status == 'confirmed' || order.status == 'completed'){
          completed_confirmed++
        }
        orders.push(order)
      });
      this.orders = orders
      this.views = orders
      console.log(this.views)
      this.accepted_picked = accepted_picked
      this.completed_confirmed = completed_confirmed
      this.pending = pending

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
    this.customer = null
    this.rider = null
    this.showModal = true
    this.details = data
    this.getUser(data.uid, 'user')
    let rider_id = data.rider? data.rider : null
    if(rider_id){
      this.getUser(rider_id, 'rider')
    }
  }

  getUser(id, type){
    this.http.get(
      this.helper.getApiUrl()+'dashboard/get_user/'+id,
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      if(type == 'rider'){
        this.rider = data.data
      }
      else{
        this.customer = data.data
      }
    })
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
        'status' : element.status,
        'Date Registered' : this.helper.formatDate(element.date)
      }
      data.push(temp)
    });

    this.excelService.exportAsExcelFile(data, 'Orders');
  }
}
