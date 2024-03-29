import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ChartsModule } from "ng2-charts";
import { NgCircleProgressModule } from "ng-circle-progress";
import { NgxGaugeModule } from "ngx-gauge";

import { AppComponent } from "./app.component";

import { FooterComponent } from "./partials/footer/footer.component";
import { NavbarComponent } from "./partials/navbar/navbar.component";
import { SidebarComponent } from "./partials/sidebar/sidebar.component";

import { ButtonsComponent } from "./ui-elements/buttons/buttons.component";
import { DropdownComponent } from "./ui-elements/dropdown/dropdown.component";
import { TablesComponent } from "./ui-elements/tables/tables.component";
import { TypographyComponent } from "./ui-elements/typography/typography.component";

import { DashboardComponent } from "./screens/dashboard/dashboard.component";

import { FormsComponent } from "./forms/forms.component";

import { MdiComponent } from "./icons/mdi/mdi.component";

import { LoaderComponent } from "./advanced-elements/loader/loader.component";


import { ChartjsComponent } from "./charts/chartjs/chartjs.component";

import { LoginComponent } from "./sample-pages/login/login.component";
import { RegisterComponent } from "./sample-pages/register/register.component";
import { Page404Component } from "./sample-pages/page404/page404.component";
import { Page500Component } from "./sample-pages/page500/page500.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpHandlerService } from "./services/http-handler/http-handler.service";
import { SharedModule } from "./shared.module";
import { PageLayoutComponent } from './layout/page-layout/page-layout.component';
import { environment } from "../environments/environment";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ExcelService } from "./services/excel.service";
import { BroadcastComponent } from './components/broadcast/broadcast.component';
import { FillDataComponent } from "./components/fill-data/fill-data.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    FormsComponent,
    ButtonsComponent,
    TablesComponent,
    TypographyComponent,
    DropdownComponent,
    LoaderComponent,
    MdiComponent,
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    PageLayoutComponent,
    BroadcastComponent,
    FillDataComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ExcelService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpHandlerService,
    multi: true
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
