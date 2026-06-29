// Importa o tipo (interface) Postagem.
// O "type" informa ao TypeScript que essa importação será utilizada apenas para tipagem,
// não gerando código JavaScript na compilação.
import type Postagem from "./Postagem";

// Exporta a interface Usuario para que ela possa ser utilizada em outros arquivos.
export default interface Usuario {
  // Identificador único do usuário.
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  senha: string;

  // Relação entre Usuário e Postagem.
  // O "?" indica que este atributo é opcional.
  // Se existir, ele poderá ser:
  // - Um vetor (array) de objetos do tipo Postagem.
  // - Ou null, indicando que o usuário ainda não possui postagens.
  postagem?: Postagem[] | null;
}
