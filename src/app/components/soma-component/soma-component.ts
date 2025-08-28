import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SomaService } from '../../services/soma-service/soma-service';

@Component({
  selector: 'app-soma-component',
  standalone: true,
  imports: [FormsModule], // ✅ Necessário para [(ngModel)]
  templateUrl: './soma-component.html',
  styleUrl: './soma-component.css'
})
export class SomaComponent {
  // Entradas numéricas
  n1: number | null = null;
  n2: number | null = null;

  // Entrada de texto
  texto: string = '';

  // Saídas exibidas
  resultado: number | null = null;
  mensagem: string | null = null;

  constructor(private service: SomaService) {}

  calcular() {
    const a = this.n1 ?? 0;
    const b = this.n2 ?? 0;
    this.resultado = this.service.somar(a, b);
  }

  enviar() {
    const val = this.texto.trim();
    if (!val) return;                // opcional: evita enviar vazio
    this.service.enviarMensagem(val);
    this.mensagem = this.service.obterMensagem();
    // Se quiser limpar o input depois de enviar:
    // this.texto = '';
  }

  limpar() {
    this.n1 = null;
    this.n2 = null;
    this.texto = '';
    this.service.limpar();
    this.resultado = this.service.obterResultado();
    this.mensagem  = this.service.obterMensagem();
  }


}
