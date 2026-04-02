import { Routes } from '@angular/router';
import { ProdutoComponent } from './components/produto-component/produto-component';
import { HomeComponent } from './components/home-component/home-component';
import { LojaComponent } from './components/loja-component/loja-component';
import { LoginComponent } from './components/login-component/login-component';
import { RecuperarSenhaComponent } from './components/recuperar-senha-component/recuperar-senha-component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },   // ✅ default para "/"
  { path: 'home', component: HomeComponent },
  { path: 'produtos', component: ProdutoComponent },
  { path: 'loja', component: LojaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  // { path: '**', redirectTo: 'home' }                      // opcional
];
