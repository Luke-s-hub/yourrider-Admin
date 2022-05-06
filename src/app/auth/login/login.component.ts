import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  year: any = new Date().getFullYear()

  submit:boolean = false;

  loginForm = this.fb.group({
    id: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    role: [1, [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private helper: HelperService,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.submit = true;
    this.auth.login(this.loginForm.value).subscribe((data : any) => {
      this.helper.setToken(data.access_token);
      this.helper.setUser(data.user)
      this.helper.showSuccess('', 'Successfully Logged in!')
      this.submit = false
      this.router.navigate([this.auth.redirectLink])
    }, (error => {
      this.submit = false
    }));
  }

}
