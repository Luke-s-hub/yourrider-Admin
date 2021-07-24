import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
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

}
