import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { BroadcastComponent } from "src/app/components/broadcast/broadcast.component";
import { HelperService } from "src/app/services/helper/helper.service";
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: "app-dashboard-2",
  templateUrl: "./dashboard-2.component.html",
  styleUrls: ["./dashboard-2.component.scss"]
})
export class Dashboard2Component implements OnInit {

  dashboardData: any = null;
  orders: any = []

  constructor(
    private helper: HelperService,
    private http: HttpClient,
    private router: Router,
    private afs: AngularFirestore,
    private matDialog: MatDialog,
  ) {
    this.getDashboardStats()
  }

  ngOnInit() {}

  broadcast(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.width = '400px'
    let dialogRef = this.matDialog.open(BroadcastComponent, dialogConfig);
    return dialogRef

  }

  getDashboardStats(){
    this.http.get(
      this.helper.getApiUrl()+'dashboard/stat',
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.dashboardData = data.data
      this.humanResouceDoughnutChartLabels = ["Active", "Inactive", "Unverified"];
      this.humanResouceDoughnutChartData = [
        {
          data: [this.dashboardData.active, this.dashboardData.unverified, this.dashboardData.inactive]
        }
      ];
      console.log(data.data)
    })
  }


  dashboardBarChartlabels = [
    "1",
    "3",
    "6",
    "9",
    "12",
    "15",
    "18",
    "21",
    "24",
    "27"
  ];
  dashboardBarChartData = [
    {
      label: "SNOOZED",
      data: [330, 380, 230, 400, 309, 430, 340, 310, 280, 300]
    },
    {
      label: "COMPLETED",
      data: [375, 440, 284, 450, 386, 480, 400, 365, 365, 435]
    },
    {
      label: "OVERDUE",
      data: [425, 480, 324, 490, 426, 520, 440, 405, 425, 475]
    }
  ];
  dashboardBarChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 20,
        bottom: 0
      }
    },
    scales: {
      yAxes: [
        {
          display: false,
          gridLines: {
            display: false
          }
        }
      ],
      xAxes: [
        {
          stacked: true,
          ticks: {
            beginAtZero: true,
            fontColor: "#bdbcbe"
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
            display: false
          },
          barPercentage: 0.2
        }
      ]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };
  dashboardBarChartColors = [
    {
      backgroundColor: "#8862e0"
    },
    {
      backgroundColor: "#49bbce"
    },
    {
      backgroundColor: "#e7487e"
    }
  ];

  dashboardTrendingBarsChartlabels = ["1", "3", "6", "9", "12", "15"];
  dashboardTrendingBarsChartData = [
    {
      label: "SNOOZED",
      data: [100, 130, 180, 170, 130, 170]
    }
  ];
  dashboardTrendingBarsChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    scales: {
      yAxes: [
        {
          display: false
        }
      ],
      xAxes: [
        {
          display: false,
          barPercentage: 0.8
        }
      ]
    }
  };
  dashboardTrendingBarsChartColors = [
    {
      backgroundColor: "#8862e0"
    }
  ];


  humanResouceDoughnutChartLabels = [];
  humanResouceDoughnutChartData = [];
  humanResouceDoughnutChartOptions = {
    cutoutPercentage: 75,
    animationEasing: "easeOutBounce",
    animateRotate: true,
    animateScale: false,
    responsive: true,
    maintainAspectRatio: true,
    showScale: true,
    legend: {
      display: false
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  };
  humanResouceDoughnutChartColors = [
    {
      backgroundColor: ["#62d896", "#3096f3", "#ee5f56"],
      borderColor: ["#62d896", "#3096f3", "#ee5f56"]
    }
  ];

}
