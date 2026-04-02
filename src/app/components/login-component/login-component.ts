import { Component, inject  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  email = '';
  senha = '';
  ok = '';
  loading = false;
  erro ='';

  private router = inject(Router);

  entrar() {
    // Login “fake” por enquanto
    console.log('Login simulado:', this.email);
    this.router.navigateByUrl('home'); // vai pra Home
  }
}
