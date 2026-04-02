import { Component, inject } from '@angular/core';
import { LojaService } from '../../services/loja-service/loja-service';
import { LojaModel } from '../../models/loja-model';
import { FormsModule } from '@angular/forms';
import { ProdutoModel } from '../../models/porduto-model';

@Component({
  selector: 'app-loja-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './loja-component.html',
  styleUrl: './loja-component.css'
})
export class LojaComponent {

private service = inject(LojaService);

  lojas: LojaModel[] = [];
  // editItem: Partial<ProdutoModel> | null = null;
  editItem: LojaModel | null = null;
  novoNome = '';
  novoCnpj ='';
  novaEndereco='';
  ok = '';
  loading = false;

  erro = '';
  busca = '';

  ngOnInit() { this.carregar(); }

  carregar() {
    this.loading = true;
    this.erro = '';
   this.service.listar()
      // Faz a inscrição (subscribe) para reagir ao resultado do Observable
      .subscribe({
        // 'next' é chamado quando a resposta chega com sucesso
        next: d => {
          this.lojas = d;     // atualiza a lista exibida na tela
          this.loading = false;  // desliga o estado de carregamento
        },
        // 'error' é chamado se a requisição falhar (rede, 4xx/5xx, etc.)
        error: e => {
          this.erro = e.message; // guarda a mensagem para exibir ao usuário
          this.loading = false;  // desliga o estado de carregamento também no erro
        }
        // (opcional) complete: () => { ... } // chamado quando o Observable completa
      });
  }

  adicionar() {
      this.erro = '';
    // validações simples

    if (!this.novoNome.trim()) {
      this.erro = 'Informe o nome.';
      return;
    }
    if (!this.novoCnpj.trim()) {
      this.erro = 'Informe o CNPJ.';
      return;
    }


    const payload: LojaModel = {
      id:'',
      nome: this.novoNome.trim(),
      endereco: this.novaEndereco.trim(),
      cnpj: this.novoCnpj.trim(),
    };

    this.loading = true;
    this.service.adicionar(payload).subscribe({
      next: (p) => {
        this.ok = `Loja "${p.nome}" cadastrado!`;
        this.loading = false;
        // limpa o formulário
        this.novoNome = '';
        this.novaEndereco = '';
        this.novoCnpj = '';
        this.carregar();
          // temporizador: some depois de 3s
            setTimeout(() => this.ok = '', 3000);
      },
      error: (e) => {
        this.erro = e.message || 'Falha ao salvar produto.';
        this.loading = false;
         // temporizador: some depois de 5s
             setTimeout(() => this.erro = '', 5000);
      }
    });

  }

    remover(id: string) {
        this.service.remover(id).subscribe({
          next: (msg: string) => {
            this.ok = msg || "Produto removido com sucesso";// "Produto apagado com sucesso!"
            this.carregar();  // recarrega a lista
            // temporizador: some depois de 3s
            setTimeout(() => this.ok = '', 3000);
          },
          error: e => {
            this.erro = e.message || 'Falha ao remover produto';
             // temporizador: some depois de 5s
             setTimeout(() => this.erro = '', 5000);
          }

        });
    }

    salvarEdicao() {
      if (!this.editItem?.id) return;
      this.loading = true;
        this.service.update(this.editItem.id, this.editItem).subscribe({
        next: result => {
          if (result) {
            this.carregar(); // primeiro recarrega
            this.ok = 'Loja atualizado com sucesso!'; // só depois mostra
            setTimeout(() => this.ok = '', 3000);
          }
        },
        error: e => {
          this.erro = e.message || 'Falha ao editar produto';
          setTimeout(() => this.erro = '', 5000);
        }
      });
    }


    openLojaId: string | null = null;

    toggleProdutos(id: string) {
      this.openLojaId = this.openLojaId === id ? null : id;
    }

    selecionarProduto(prod: ProdutoModel) {

      console.log('Produto selecionado', prod);
    }


}
