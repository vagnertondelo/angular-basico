import { Routes } from '@angular/router';
import { ProdutoComponent } from './components/produto-component/produto-component';
import { HomeComponent } from './components/home-component/home-component';
import { SomaComponent } from './components/soma-component/soma-component';

export const routes: Routes = [
{ path: 'produtos', component: ProdutoComponent },
{ path: 'soma', component: SomaComponent },
{ path: '', component: HomeComponent },
];
