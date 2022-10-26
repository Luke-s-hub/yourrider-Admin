import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CreatorsComponent } from './creators/creators.component';
import { Dashboard2Component } from './dashboard-2/dashboard-2.component';
import { OrdersComponent } from './orders/orders.component';
import { PostRequestComponent } from './post-request/post-request.component';
import { RiderCodeComponent } from './rider-code/rider-code.component';
import { VendorsComponent } from './vendors/vendors.component';
import { WithdrawalRequestsComponent } from './withdrawal-requests/withdrawal-requests.component';



const routes: Routes = [
  {
    path: '',
    component: Dashboard2Component,
  },
  {
    path: 'users',
    component: CreatorsComponent,
  },
  {
    path: 'riders',
    component: VendorsComponent,
  },
  {
    path: 'companies',
    component: CampaignsComponent,
  },
  {
    path: 'codes',
    component: RiderCodeComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'withdrawal-requests',
    component: WithdrawalRequestsComponent,
  },
  {
    path: 'post-requests',
    component: PostRequestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
