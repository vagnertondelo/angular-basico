import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LojaModel } from '../../models/loja-model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LojaService {
  private http = inject(HttpClient);
  private base = 'http://localhost:8080/loja';
  // private base = '/produtos';

  listar(): Observable<LojaModel[]> {
    return this.http.get<LojaModel[]>(`${this.base}/listar`).pipe(catchError(this.handle));

  }

  adicionar(data: LojaModel): Observable<LojaModel> {
    return this.http.post<LojaModel>(`${this.base}/salvar`, data).
    pipe(catchError(this.handle));
  }

  update(id: string, data: LojaModel): Observable<LojaModel> {
  return this.http
    .post<LojaModel>(`${this.base}/editar/${id}`, data)
    .pipe(catchError(this.handle));
  }

  remover(id: string): Observable<string> {
    return this.http.post(`${this.base}/apagar/${id}`, null, {
      responseType: 'text'
    }).pipe(
      catchError(this.handle)
    );
  }


      delete(id: string) {
      return this.http.delete(`${this.base}/${id}`, {
        responseType: 'text'
      }); // Observable<string>
    }

  getById(id: string): Observable<LojaModel> {
    return this.http.get<LojaModel>(`${this.base}/${id}`).pipe(catchError(this.handle));
  }


  private handle(err: HttpErrorResponse) {
    const msg = err.error?.message || err.error?.erro || err.message || 'Erro inesperado';
    return throwError(() => new Error(msg));
  }

}
