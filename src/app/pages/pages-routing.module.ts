import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CreatorsComponent } from './creators/creators.component';
import { Dashboard2Component } from './dashboard-2/dashboard-2.component';
import { VendorsComponent } from './vendors/vendors.component';



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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
