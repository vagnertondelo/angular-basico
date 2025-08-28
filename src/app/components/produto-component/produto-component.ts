import { Component, inject, OnInit } from '@angular/core';
import { ProdutoModel } from '../../models/porduto-model';
import { ProdutoService } from '../../services/produto-service/produto-service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-produto-component',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule,
    MatListModule, MatDividerModule, MatCardModule

  ],
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
