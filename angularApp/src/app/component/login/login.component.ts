import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserservicesService } from 'src/app/services/userservices.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;

  constructor(private userService: UserservicesService,
              private formBuilder: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar
  ) { }
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  onSubmit(loginForm: NgForm) {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      console.log('systemerror');
      this.snackBar.open('email or password incorrect', 'Ok', { duration: 200 });
      return;
    }
    this.userService.loginUser(this.loginForm.value)
      .subscribe(
        (response: any) => {
          console.log(response.token);
          console.log(response.statusCode);
          if (response.statusCode === 202) {
            this.snackBar.open(response.message, 'Ok', { duration: 20000 });
            localStorage.setItem('token', response.token);
            localStorage.setItem('email', this.loginForm.value.email);
            this.router.navigate(['/dashboard']);
          } else {
            this.snackBar.open(response.message, 'Ok', { duration: 2000});
          }
        });
  }
}
