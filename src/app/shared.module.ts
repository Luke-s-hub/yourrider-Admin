import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material
import { MaterialModule } from './material/material.module';

import { ToastrModule } from "ngx-toastr";
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ChartsModule } from 'ng2-charts';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartjsComponent } from './charts/chartjs/chartjs.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ChartsModule,
        NgxGaugeModule,
        ReactiveFormsModule,
        NgbModule,
        NgCircleProgressModule.forRoot({
          radius: 60,
          outerStrokeWidth: 10,
          innerStrokeWidth: 5,
          showBackground: false,
          startFromZero: false
        }),
        ToastrModule.forRoot(),
     ],
    declarations: [
        ConfirmComponent,
        ChartjsComponent,
    ],
    exports: [
        MaterialModule,
        ToastrModule,
        ConfirmComponent,
        ChartsModule,
        ChartjsComponent,
        ReactiveFormsModule,
        NgbModule,
        NgxGaugeModule,
        NgCircleProgressModule
    ]
})
export class SharedModule {}
