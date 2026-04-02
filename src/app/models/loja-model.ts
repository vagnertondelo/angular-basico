import { ProdutoModel } from "./porduto-model";

export interface LojaModel {
  id: string;
  nome: string;
  endereco: string;
  cnpj: string;
  produtos?: ProdutoModel[];
}
