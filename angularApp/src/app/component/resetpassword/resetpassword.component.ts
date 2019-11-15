import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserservicesService } from 'src/app/services/userservices.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  resetform: FormGroup;
  loading = false;
  private token: string;
  
  constructor(private userService: UserservicesService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private route: Router) { }

  ngOnInit() {
    this.resetform = new FormGroup({
      password: new FormControl('', [Validators.required])
      // confirmpassword: new FormControl('', [Validators.required])
    });
    this.router.params.subscribe(param => {
      this.token = param.token;
    });
  }
  resetPassword(resetform: NgForm) {
    console.log(this.resetform);
    if (this.resetform.invalid) {
      console.log('refuse');

      return;
    }
    this.userService.resetpassword(this.resetform.value, this.token)
      .subscribe(
        (response: any) => {
          console.log('refuse');

          this.route.navigate(['/login']);
        },
        error => {
          this.loading = false;
        }
      );
  }
}
