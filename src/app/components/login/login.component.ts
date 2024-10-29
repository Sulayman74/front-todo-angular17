import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  private formBuilder = inject(FormBuilder)
  private router = inject(Router)
  private userService = inject(UserService)

  constructor(

  ) {
    // redirect to home if already logged in
    // if (this.userService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields


  onSubmit() {
    this.submitted = true;
    const formValues = this.loginForm.value
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.login(formValues.email, formValues.password)
      .subscribe({
        next: (data) => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        }
      });
  }
}

