import { Component, OnInit } from "@angular/core";
import { NgbDropdownConfig } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/services/auth/auth.service";
import { HelperService } from "src/app/services/helper/helper.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;

  toggleRightSidebar() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  toggleIconOnlySidebar() {
    this.iconOnlyToggled = !this.iconOnlyToggled;
    if (this.iconOnlyToggled) {
      document.querySelector("body").classList.add("sidebar-icon-only");
    } else {
      document.querySelector("body").classList.remove("sidebar-icon-only");
    }
  }

  constructor(config: NgbDropdownConfig, public helper: HelperService, public auth: AuthService) {
    config.placement = "bottom-right";
  }
  ngOnInit() {}
}
