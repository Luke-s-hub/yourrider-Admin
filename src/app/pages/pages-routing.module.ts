import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovedCompaniesComponent } from './approved-companies/approved-companies.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CreatorsComponent } from './creators/creators.component';
import { Dashboard2Component } from './dashboard-2/dashboard-2.component';
import { OrdersComponent } from './orders/orders.component';
import { RiderCodeComponent } from './rider-code/rider-code.component';
import { RiderCompanyComponent } from './rider-company/rider-company.component';
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
    path: 'pending_companies',
    component: CampaignsComponent,
  },
  {
    path: 'companies',
    component: ApprovedCompaniesComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
