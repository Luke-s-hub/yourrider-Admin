import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared.module';
import { Dashboard2Component } from './dashboard-2/dashboard-2.component';
import { VendorsComponent } from './vendors/vendors.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CreatorsComponent } from './creators/creators.component';
import { RiderCodeComponent } from './rider-code/rider-code.component';
import { OrdersComponent } from './orders/orders.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { WithdrawalRequestsComponent } from './withdrawal-requests/withdrawal-requests.component';

@NgModule({
  declarations: [
    Dashboard2Component,
    VendorsComponent,
    CampaignsComponent,
    CreatorsComponent,
    RiderCodeComponent,
    OrdersComponent,
    ViewOrderComponent,
    WithdrawalRequestsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PagesModule { }
