import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ForgotPassModel } from '../../models/forgot-pass-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private http = inject(HttpClient);

  private base = 'http://localhost:8080/auth';

  recuperarSenha(data: ForgotPassModel): Observable<String> {
     return this.http.post(`${this.base}/forgot-password`, data, {
    responseType: 'text' // 👈 diz pro Angular que o corpo é TEXTO
  }).
      pipe(catchError(this.handle));
    }

    private handle(err: HttpErrorResponse) {
    const msg = err.error?.message || err.error?.erro || err.message || 'Erro inesperado';
    return throwError(() => new Error(msg));
  }

}
