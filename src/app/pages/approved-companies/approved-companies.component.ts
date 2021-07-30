import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/services/excel.service';
import { HelperService } from 'src/app/services/helper/helper.service'; 

@Component({
  selector: 'app-approved-companies',
  templateUrl: './approved-companies.component.html',
  styleUrls: ['./approved-companies.component.scss']
})
export class ApprovedCompaniesComponent implements OnInit {

  loading:boolean = true
  companyData: any;

  constructor(
    public helper: HelperService,
    private http: HttpClient,
    private router: Router,
    private excelService: ExcelService
  ) { }

  ngOnInit(): void {
    this.getCompanyData()
  }

  getCompanyData(){
    this.http.get(
      this.helper.getApiUrl()+'company/approved',
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.companyData = data.data
      console.log(data.data)
      this.loading = false
    })
  }

  delete(id){
    if(window.confirm('Are you sure you want to delete this company?')){
      this.http.delete(
        this.helper.getApiUrl()+'company/delete_approved/'+id,
        {headers: this.helper.header()}
      ).subscribe((data: any) => {
        this.getCompanyData()
        this.helper.showSuccess('', data.message)
      })
    }
  }

  exportData(){
    let data = []
    this.companyData.forEach(element => {
      let temp = {
        'Company Name' : element.company_name,
        'Company Email' : element.company_email,
        'Company Phone' : element.company_phone,
        'Manager Name' : element.manager_name,
        'Manager Email' : element.manager_email,
        'Manager Phone' : element.manager_phone,
        'Manager Identification Type' : element.manager_id_type,
        'Manager Identification Number' : element.manager_id_number,
        'Manager Photo Link' : this.helper.getApiImageLink()+element.manager_photo,
        'CAC Document Link' : this.helper.getApiImageLink()+element.cac_certificate,
        'Operation Location' : this.getOperationLocation(element.operation_location),
        'Tax ID Number' : element.tax_id_number,
        'Date Registered' : this.helper.formatDate(element.created_at)
      }
      data.push(temp)
    });

    this.excelService.exportAsExcelFile(data, 'Registered Company Data');
  }

  getOperationLocation(data){
    data = JSON.parse(data)
    if(!data || data.length < 1){
      return 'Unknown'
    }
    else{
      let temp = []
      data.forEach(element => {
        if(element != null && element != 'null' ){
          temp.push(element)
        }
      });
      if(!temp || temp.length < 1){
        return 'Unknown'
      }
      return temp.join(', ')
    }
  }


}
