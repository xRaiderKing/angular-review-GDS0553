import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { error } from 'console';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { response } from 'express';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private messageService: MessageService) {
  }

  get email() {
    return this.loginForm.controls['email'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  login(){
    const { email, password } = this.loginForm.value;

    this.authService.getUserbyEmail(email as string).subscribe((response) => {
      if (response.length > 0 && response[0].password == password) {
        sessionStorage.setItem('email', email as string);
        this.router.navigate(['home']);
      }else{
        console.log('Contraseña incorrecta');
        this.messageService.add({ severity: 'error',
         summary: 'Errorusuario',
        detail: 'Contraseña incorrecta' });
        
      }
    });
    
  }
  }

