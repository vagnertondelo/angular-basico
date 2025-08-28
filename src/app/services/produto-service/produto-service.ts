import { Injectable } from '@angular/core';
import { ProdutoModel } from '../../models/porduto-model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtos: ProdutoModel[] = [
    { id: 1, nome: 'Notebook' },
    { id: 2, nome: 'Smartphone' },
    { id: 3, nome: 'Fone de ouvido' },
  ];
  private nextId = 4;

  listar(): ProdutoModel[] {
    return [...this.produtos]; // evita mutação fora do service
  }

  adicionar(nome: string): ProdutoModel {
    const novo: ProdutoModel = { id: this.nextId++, nome };
    this.produtos.push(novo);
    return novo;
  }

  remover(id: number): void {
    // retorna true para todos os produtos cujo id é diferente do que queremos excluir.
    this.produtos = this.produtos.filter(p => p.id !== id);
  }

}
