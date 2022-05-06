import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-fill-data',
  templateUrl: './fill-data.component.html',
  styleUrls: ['./fill-data.component.scss']
})
export class FillDataComponent implements OnInit {

  time: 1000
  results: any = []

  constructor(
    private _httpClient: HttpClient,
    private _helper: HelperService,
    private afs: AngularFirestore,
    private activateRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((param) => {
      if(param.type == 'orders'){
        this.fillOrders()
      }
    })
  }

  fillOrders(){
    this.afs.collection('orders', ref => ref.orderBy('date', 'desc')).get().subscribe((result:any) => {
      let time = 1000
      result.forEach(element => {
        let order = element.data()
        console.log(order)
        const data = {
          user_id : order.uid,
          name : order.packages[0].name,
          sender_name : order.packages[0].sender? order.packages[0].sender : 'unset',
          sender_phone : order.packages[0].sender_phone? order.packages[0].sender_phone : 'unset',
          receiver_name : order.packages[0].receiver? order.packages[0].receiver : 'unset',
          receiver_phone : order.packages[0].receiver_phone? order.packages[0].receiver_phone : 'unset',
          category : order.packages[0].category? order.packages[0].category : 'unset',
          amount : order.amount,
          rider_id : order.rider,
          description : order.packages[0].description? order.packages[0].description : 'unset',
          pickup_data : order.packages[0].pickupData? order.packages[0].pickupData : order.pickup? order.pickup : 'unset',
          destination_data : order.packages[0].destinationData? order.packages[0].destinationData : 'unset',
          duration : order.packages[0].duration? order.packages[0].duration : 'unset',
          distance : order.packages[0].distance? order.packages[0].distance : 'unset',
          image : 'uploads/default_package.png',
          delivery_type : order.deliveryType,
          payment_type : order.paymentType,
          paid : order.paid,
          status: order.status == 'confirmed'? 'delivered' : order.status,
          state : 'FCT',
          created_at: new Date(order.date).toDateString(),
          updated_at: new Date(order.date).toDateString()
        }
        setTimeout(() => {
          this._httpClient.post(this._helper.getApiUrl()+'fill_orders', data).subscribe(() => {
            this.results.push(order.name)
          }, error => this.results.push('error'))
        }, time)
        time += 1000
      });
    })
  }

}


