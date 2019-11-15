import { Component, OnInit } from '@angular/core';
import { UserservicesService } from 'src/app/services/userservices.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder, FormControl, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
forgotForm: FormGroup;
loading = false;
message: any;
  constructor(private userService: UserservicesService,
              private formBuilder: FormBuilder,
              private router: Router, private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.forgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }
  onSubmit() {
    console.log(this.forgotForm.value);
    if (this.forgotForm.invalid) {
      return;
    }
    this.userService.forgotPasswordUser(this.forgotForm.value)
      .subscribe(
        (response: any) => {
          console.log('reset password mail sent to your email');
          this.snackBar.open('open your email to reset password', 'Ok', { duration: 20000 });
        },
        error => {
          this.loading = false;
        }
      );
  }
}
