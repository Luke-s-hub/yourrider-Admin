import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormBuilder, Validators } from "@angular/forms";
import { ExcelService } from "src/app/services/excel.service";
import { HelperService } from "src/app/services/helper/helper.service";

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
})
export class OrdersComponent implements OnInit {
  searchRider = false;
  showModal: boolean = false;
  details: any;
  locations: any = [];
  views: any = [];
  timeout: any;
  orders: any = [];
  loading: boolean = true;
  pending: number;
  count: number;
  accepted: number;
  picked: number;
  delivered: number;
  riderData: any = [];
  company: any = [];
  riders: any = [];
  filteredRidersOptions: any[];

  filterForm = this.fb.group({
    date: [""],
    company: [null],
    payment_type: [null],
    delivery_type: [null],
    status: [null],
  });

  ridersForm = this.fb.group({
    rider_id: [""],
    order_id: [""],
  });

  locationForm = this.fb.group({
    instance: ["", [Validators.required]],
    text: ["", [Validators.required]],
    subtext: ["", [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    public helper: HelperService,
    private http: HttpClient,
    private excelService: ExcelService
  ) {
    this.filterForm.valueChanges.subscribe((value) => {
      this.filterData();
    });
  }

  ngOnInit(): void {
    // this.ridersForm.get("rider").valueChanges.subscribe(newValue => {
    //   this.filteredRidersOptions = this._filter(newValue);
    // });
    this.getCompany();
    this.getOrders();
    this.getRiders();
  }

  getRiders() {
    this.http
      .get(this.helper.getApiUrl() + "dashboard/rider", {
        headers: this.helper.header(),
      })
      .subscribe((data: any) => {
        console.log(data);
        this.riders = data.data.all;
        this.loading = false;
      });
  }

  getCompany() {
    this.http
      .get(this.helper.getApiUrl() + "dashboard/get_companies", {
        headers: this.helper.header(),
      })
      .subscribe((data: any) => {
        this.company = data.data;
      });
  }

  getOrders() {
    this.loading = true;
    this.http
      .get(this.helper.getApiUrl() + "order", { headers: this.helper.header() })
      .subscribe((data: any) => {
        this.orders = data.data.all.data;
        this.views = data.data.all.data;
        this.accepted = data.data.accepted;
        this.picked = data.data.picked;
        this.delivered = data.data.delivered;
        this.pending = data.data.pending;
        this.count = data.data.count;
        console.log("data gotten", data.data);
        this.loading = false;
      });
  }

  filterData() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      let result = this.orders;
      if (this.filterForm.value.date) {
        result = result.filter((value) => {
          console.log(
            new Date(value.date),
            new Date(this.filterForm.value.date)
          );
          if (
            this.helper.formatDate(value.date) ==
            this.helper.formatDate(this.filterForm.value.date)
          ) {
            return value;
          }
        });
      } else {
        console.log("no date");
      }
      if (this.filterForm.value.payment_type) {
        result = result.filter((value) => {
          if (value.paymentType == this.filterForm.value.payment_type) {
            return value;
          }
        });
      } else {
        console.log("no paymentType");
      }

      if (this.filterForm.value.delivery_type) {
        result = result.filter((value) => {
          if (value.deliveryType == this.filterForm.value.delivery_type) {
            return value;
          }
        });
      } else {
        console.log("no deliveryType");
      }

      if (this.filterForm.value.company) {
        result = result.filter((value) => {
          if (value.company == this.filterForm.value.company) {
            return value;
          }
        });
      } else {
        console.log("no company set");
      }

      if (this.filterForm.value.status) {
        result = result.filter((value) => {
          if (value.status == this.filterForm.value.status) {
            return value;
          }
        });
      } else {
        console.log("no status");
      }

      this.views = result;
    }, 1000);
  }

  view(data) {
    console.log(data);
    this.locations = [];
    this.showModal = true;
    this.details = data;
    if (data.tracking) {
      this.locations = JSON.parse(data.tracking.locations);
    }
  }

  exportData() {
    let data = [];
    this.views.forEach((element) => {
      let temp = {
        "Pickup Location": element.pickup.result.description,
        "Number of Packages": element.packages.length,
        "Amount (NGN)": element.amount,
        "Delivery Type": element.deliveryType,
        "Payment Type": element.paymentType,
        Rider: element.rider_name,
        Company: element.company,
        status: element.status,
        "Date Registered": this.helper.formatDate(element.date),
      };
      data.push(temp);
    });

    this.excelService.exportAsExcelFile(data, "Orders");
  }

  private _filter(search) {
    console.log(search);
    if (search === "") {
      console.log("yes");
      return this.riders
        .map((list) => {
          return list;
        })
        .slice(0, 5);
    }
    return this.riders
      .filter((item) =>
        item.name.toLowerCase().includes(String(search).toLowerCase())
      )
      .slice(0, 5);
  }

  activateAutocomplete() {
    if (this.ridersForm.value.rider.length == 0) {
      this.filteredRidersOptions = this._filter("");
    }
  }

  onChangeEvent(e) {
    this.filteredRidersOptions = this._filter(e.target.value);
  }

  assignRider(orderId) {
    this.ridersForm.get("order_id").patchValue(orderId);
    this.searchRider = true;
  }

  selectRider(riderId) {
    this.ridersForm.get("rider_id").patchValue(riderId);
    this.processRiderAssignment();
    this.searchRider = false;
    this.showModal = false;
  }

  processRiderAssignment() {
    const data = this.ridersForm.value;
    this.http
      .get(
        this.helper.getApiUrl() +
          `order/accept/${data.rider_id}/${data.order_id}`,
        { headers: this.helper.header() }
      )
      .subscribe(
        (data: any) => {
          this.getOrders();
          this.helper.showSuccess("Rider assigned successfully", "");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addLocation() {
    this.http
      .post(
        this.helper.getApiUrl() + `tracking/update`,
        { ...this.locationForm.value, order_id: this.details.id },
        { headers: this.helper.header() }
      )
      .subscribe(
        (data: any) => {
          this.getOrders();
          data.data.forEach((element) => {
            this.locations.push(element);
          });
          this.helper.showSuccess("Locations updated successfully", "");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteLocation(i) {
    this.locations.splice(i, 1);
    this.http
      .post(
        this.helper.getApiUrl() + `tracking/delete`,
        { index: i, order_id: this.details.id },
        { headers: this.helper.header() }
      )
      .subscribe(
        (data: any) => {
          this.getOrders();
          this.helper.showSuccess("Locations deleted successfully", "");
        },
        (error) => {
          console.log(error);
        }
      );
  }

  async decline(id) {
    this.showModal = false
    const alert = await this.helper.confirm(
      "Are you sure you want to decline this rider?"
    );
    alert.afterClosed().subscribe((data) => {
      if (data) {
        this.http
          .get(this.helper.getApiUrl() + "order/status/" + id + "/pending", {
            headers: this.helper.header(),
          })
          .subscribe(
            (data: any) => {
              this.getOrders();
              this.helper.showSuccess("Rider declined successfully", "");
            },
            (error) => {
              console.log(error);
            }
          );
      }
    });
  }

  async cancel(id) {
    this.showModal = false
    const alert = await this.helper.confirm(
      "Are you sure you want to cancel this request?"
    );
    alert.afterClosed().subscribe((data) => {
      if (data) {
        this.http
          .delete(this.helper.getApiUrl() + "order/" + id, {
            headers: this.helper.header(),
          })
          .subscribe(
            (data: any) => {
              this.getOrders();
              this.helper.showSuccess("Request removed successfully", "");
            },
            (error) => {
              console.log(error);
            }
          );
      }
    });
  }
}
