import { inject, Injectable } from '@angular/core';
import { ProdutoModel } from '../../models/porduto-model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private http = inject(HttpClient);
  private base = 'http://localhost:8080/produtos';
  // private base = '/produtos';

  listar(): Observable<ProdutoModel[]> {
    return this.http.get<ProdutoModel[]>(`${this.base}/listar`).pipe(catchError(this.handle));

  }

// return this.http.get<ProdutoModel[]>(`${this.base}/listar`).pipe(
//   map(produtos =>
//     produtos.map(p => ({
//       ...p,
//       precoFormatado: `R$ ${Number(p.preco).toFixed(2)}`
//     }))
//   ),
//   catchError(this.handle)
// );


  //  listar(term?: string): Observable<ProdutoModel[]> {
  //   let params = new HttpParams();
  //   if (term?.trim()) params = params.set('q', term.trim());
  //   return this.http.get<ProdutoModel[]>(`${this.base}/listar`, { params }).pipe(catchError(this.handle));
  // }


  adicionar(data: ProdutoModel): Observable<ProdutoModel> {
    return this.http.post<ProdutoModel>(`${this.base}/salvar`, data).
    pipe(catchError(this.handle));
  }

  update(id: string, data: ProdutoModel): Observable<ProdutoModel> {
  return this.http
    .post<ProdutoModel>(`${this.base}/editar/${id}`, data)
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

  getById(id: string): Observable<ProdutoModel> {
    return this.http.get<ProdutoModel>(`${this.base}/${id}`).pipe(catchError(this.handle));
  }


  private handle(err: HttpErrorResponse) {
    const msg = err.error?.message || err.error?.erro || err.message || 'Erro inesperado';
    return throwError(() => new Error(msg));
  }
}
