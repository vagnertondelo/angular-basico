import { Component, inject, OnInit } from '@angular/core';
import { ProdutoModel } from '../../models/porduto-model';
import { ProdutoService } from '../../services/produto-service/produto-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './produto-component.html',
  styleUrl: './produto-component.css'
})
export class ProdutoComponent  implements OnInit{
 private service = inject(ProdutoService);

  produtos: ProdutoModel[] = [];
  novoNome = '';

  ngOnInit() { this.carregar(); }

  carregar() {
    this.produtos = this.service.listar();
  }

  adicionar() {
    const nome = this.novoNome.trim();
    if (!nome) return;
    this.service.adicionar(nome);
    this.novoNome = '';
    this.carregar();
  }

  remover(id: number) {
    this.service.remover(id);
    this.carregar();
  }

}
