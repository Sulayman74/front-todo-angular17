import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signUpForm!: FormGroup;
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

    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstname: [''],
      lastname: [''],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    const formValues = this.signUpForm.value
    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.signUp(formValues)
      .subscribe({
        next: (data) => {
          console.log("formulaire d'inscription", data);
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        }
      });
  }
}
