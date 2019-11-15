import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserservicesService } from 'src/app/services/userservices.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  loading = false;
  constructor(private userService: UserservicesService,
              private formBuilder: FormBuilder,
              private router: Router
  ) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', [Validators.required]),
      mobilenumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  onSubmit() {
    console.log(this.registrationForm.value);
    if (this.registrationForm.invalid) {
      return;
    }
    this.userService.registerUser(this.registrationForm.value)
      .subscribe(
        (response: any) => {
          console.log(response.message);
          this.router.navigate(['/login']);
        },
        error => {
          this.loading = false;
        }
      );
  }

}
