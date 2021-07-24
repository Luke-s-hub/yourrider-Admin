import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  companyData: any;

  constructor(
    public helper: HelperService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCompanyData()
  }

  getCompanyData(){
    this.http.get(
      this.helper.getApiUrl()+'company',
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.companyData = data.data
      console.log(data.data)
    })
  }

  delete(id){
    if(window.confirm('Are you sure you want to delete this company?')){
      this.http.delete(
        this.helper.getApiUrl()+'company/delete/'+id,
        {headers: this.helper.header()}
      ).subscribe((data: any) => {
        this.getCompanyData()
        this.helper.showSuccess('', data.message)
      })
    }
  }

}
