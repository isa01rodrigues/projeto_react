import type Postagem from "./Postagem";

export default interface Tema {
  id: number;
  descricao: string;

  // Propriedade que representa as postagens associadas ao usuário.
  // ?               -> A propriedade é opcional, ou seja, pode não existir no objeto.
  // Postagem[]      -> Se existir, armazenará um array (lista) de objetos do tipo Postagem.
  // | null          -> Também pode receber o valor null, indicando que o usuário não possui postagens ou que elas ainda não foram carregadas.
  postagem?: Postagem[] | null;
}
