import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {

  vendorData: any

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private router: Router
  ) { 
    this.getVendorStats()
  }

  ngOnInit(): void {
  }

  getVendorStats(){
    this.http.get(
      this.helper.getApiUrl()+'dashboard/rider',
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.vendorData = data.data
      console.log('data gotten', data.data)
    })
  }

  activate(id){
    if(window.confirm('Are you sure you want to activate this rider?')){
      this.http.get(
        this.helper.getApiUrl()+'dashboard/user/enable/'+id,
        {headers: this.helper.header()}
      ).subscribe((data: any) => {
        this.getVendorStats()
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
        this.getVendorStats()
        this.helper.showSuccess('', data.message)
      })
    }

  }

}
