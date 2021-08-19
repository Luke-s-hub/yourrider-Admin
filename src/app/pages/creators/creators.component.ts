import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.scss']
})
export class CreatorsComponent implements OnInit {

  creatorData: any

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private router: Router,
    private excelService: ExcelService
  ) { 
    this.getCreatorStats()
  }

  ngOnInit(): void {
  }

  getCreatorStats(){
    this.http.get(
      this.helper.getApiUrl()+'dashboard/user',
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.creatorData = data.data
      console.log('data gotten', data.data)
    })
  }

  activate(id){
    if(window.confirm('Are you sure you want to activate this user?')){
      this.http.get(
        this.helper.getApiUrl()+'dashboard/user/enable/'+id,
        {headers: this.helper.header()}
      ).subscribe((data: any) => {
        this.getCreatorStats()
        this.helper.showSuccess('', data.message)
      })
    }

  }

  deactivate(id){
    if(window.confirm('Are you sure you want to deactivate this user?')){
      this.http.get(
        this.helper.getApiUrl()+'dashboard/user/disable/'+id,
        {headers: this.helper.header()}
      ).subscribe((data: any) => {
        this.getCreatorStats()
        this.helper.showSuccess('', data.message)
      })
    }

  }

  exportData(){
    let data = []
    this.creatorData.all.forEach(element => {
      let temp = {
        'Name' : element.name,
        'Email' : element.email,
        'Phone' : element.phone,
        'Date Registered' : this.helper.formatDate(element.user.created_at)
      }
      data.push(temp)
    });

    this.excelService.exportAsExcelFile(data, 'User Data');
  }

}
