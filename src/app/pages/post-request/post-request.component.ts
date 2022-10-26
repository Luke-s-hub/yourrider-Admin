import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HelperService } from "src/app/services/helper/helper.service";

@Component({
  selector: "app-post-request",
  templateUrl: "./post-request.component.html",
  styleUrls: ["./post-request.component.scss"],
})
export class PostRequestComponent implements OnInit {
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef =
    {} as ElementRef;

  label = "Upload csv";
  fileData: File = {} as File;
  file: any;
  submit = false
  errors: any = []

  constructor(
    public helper: HelperService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {}

  fileProgress(fileInput: any) {
    this.label = fileInput.target.files[0]?.name;
    this.fileData = <File>fileInput.target.files[0];
    this.uploadFile();
  }

  selectFile() {
    this.fileInput.nativeElement.click();
  }

  downloadFormat() {
    window.location.href = this.helper.getApiUrl() + "download-request-format";
  }

  downloadRidersId() {
    window.location.href = this.helper.getApiUrl() + "download-riders-id";
  }

  downloadCompaniesId() {
    window.location.href = this.helper.getApiUrl() + "download-companies-id";
  }

  uploadFile() {
    this.submit = true
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.file = fileReader.result;
      const formData = new FormData();
      formData.append("file", this.file);
      this.http
        .post(this.helper.getApiUrl() + "upload-request", formData, {
          headers: this.helper.header(),
        })
        .subscribe(
          (data: any) => {
            this.submit = false
            this.errors = data.errors
            if(this.errors.length == 0){
              this.helper.showSuccess(data.message, 'Success')
            }
            this.fileInput.nativeElement.value = ''
            this.label = 'Upload csv'
            console.log("data gotten", data);
          },
          (error) => {
            this.submit = false
            this.fileInput.nativeElement.reset()
            this.label = 'Upload csv'
            console.log(error);
          }
        );
    };
    // fileReader.readAsArrayBuffer(this.file);
    fileReader.readAsDataURL(this.fileData);
  }
}
