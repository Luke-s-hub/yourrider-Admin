import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {

  submit: boolean = false

  messageForm = this.fb.group({
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<BroadcastComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  send(){
    this.submit = true
    this.http.post(
      this.helper.getApiUrl()+'notifications/send_all_user_notification',
      this.messageForm.value,
      {headers: this.helper.header()}
    ).subscribe((data: any) => {
      this.helper.showSuccess('', data.message)
      this.submit = false
      console.log(data.data)
      this.close()
    }, error => {
      this.submit = false
      console.log (error)
    })
  }

}
