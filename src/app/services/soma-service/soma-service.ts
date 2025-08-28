import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SomaService {
   /** Estado em memória (mock) */
  private resultado = 0;
  private mensagem: string | null = null;

  /** Regra: somar dois números (com tolerância a NaN/vazio). */
  somar(a: number, b: number): number {
    const x = this.toNumber(a);
    const y = this.toNumber(b);
    this.resultado = x + y;
    return this.resultado;
  }

  /** Regra: registrar a última mensagem enviada. */
  enviarMensagem(texto: string): string {
    this.mensagem = (texto ?? '').toString().trim();
    return this.mensagem;
  }

  /** Getters do estado */
  obterResultado(): number {
    return this.resultado;
  }

  obterMensagem(): string | null {
    return this.mensagem;
  }

  /** Reset do estado (mock) */
  limpar(): void {
    this.resultado = 0;
    this.mensagem = null;
  }

  /** Utilitário */
  private toNumber(v: unknown): number {
    const n = typeof v === 'number' ? v : Number(v);
    return Number.isNaN(n) ? 0 : n;
  }
}
