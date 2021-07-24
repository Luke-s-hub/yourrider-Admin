import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared.module';
import { Dashboard2Component } from './dashboard-2/dashboard-2.component';
import { VendorsComponent } from './vendors/vendors.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CreatorsComponent } from './creators/creators.component';

@NgModule({
  declarations: [
    Dashboard2Component,
    VendorsComponent,
    CampaignsComponent,
    CreatorsComponent
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
