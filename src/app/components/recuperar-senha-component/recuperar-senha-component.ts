import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth-service';
import { ForgotPassModel } from '../../models/forgot-pass-model';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-recuperar-senha-component',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './recuperar-senha-component.html',
  styleUrl: './recuperar-senha-component.css'
})
export class RecuperarSenhaComponent {
  email = '';
  username = '';
  loading = false;
  ok = '';
  erro='';

  constructor(private serviceAuth: AuthService) {}

  recuperar() {
    if (!this.email) return;
     const payload: ForgotPassModel = {
      email: this.email,
      username: this.username

    };
    this.erro = '';
    this.ok = '';
    this.loading = true;
    this.serviceAuth.recuperarSenha(payload).subscribe({
      next: (p) => {
        this.ok = `Email enviado com sucesso!`;
        this.loading = false;
        // limpa o formulário
        this.email = '';
        this.username = '';
        setTimeout(() => this.ok = '', 5000);
      },
      error: (e) => {
        this.erro = e.message || 'Erro ao enviar o email.';
        this.loading = false;
         // temporizador: some depois de 5s
             setTimeout(() => this.erro = '', 5000);
      }
    });



  }
}
