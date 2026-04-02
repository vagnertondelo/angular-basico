import { Component, inject, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);

  // URL reativa (atualiza a cada NavigationEnd)
  urlSig = toSignal(
  // Escuta o stream de eventos do roteador (navegações, etc.)
  this.router.events.pipe(
    // Filtra apenas eventos de fim de navegação (quando a URL realmente mudou)
    filter(e => e instanceof NavigationEnd),

    // Emite um valor inicial assim que o app carrega (antes da 1ª navegação)
    startWith(null),

    // Mapeia o evento para a URL atual (sem query string ?... nem hash #...)
    map(() => (this.router.url || '/').split('?')[0].split('#')[0])
  ),

  // Valor inicial do signal: pathname atual do browser (fallback para '/')
  { initialValue: (typeof location !== 'undefined' ? location.pathname : '/') }
  );

  // Esconde o menu apenas nas rotas de autenticação
  isAuthPage = computed(() => {
    // Lê a URL atual a partir do signal reativo acima
    const url = this.urlSig();

    // Retorna true se a rota começar com /login ou /recuperar-senha
    // (ou seja, nessas páginas o menu não deve aparecer)
    return url.startsWith('/login') || url.startsWith('/recuperar-senha');
  });

}
