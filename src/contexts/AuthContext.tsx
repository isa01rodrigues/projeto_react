// Importa as funcionalidades necessárias do React:
// - createContext: cria um contexto para compartilhar informações entre componentes.
// - ReactNode: representa qualquer conteúdo React que será renderizado.
// - useState: cria estados dentro do componente.
import { createContext, type ReactNode, useState } from "react";

// Importa a interface que define a estrutura dos dados do usuário autenticado.
import type UsuarioLogin from "../models/UsuarioLogin";

// Importa a função responsável por realizar a requisição de login na API.
import { login } from "../services/Service";

// Interface que define quais dados e funções estarão disponíveis
// para todos os componentes que utilizarem o AuthContext.
interface AuthContextProps {
  // Armazena as informações do usuário autenticado.
  usuario: UsuarioLogin;

  // Função responsável por realizar o logout.
  handleLogout(): void;

  // Função responsável por autenticar o usuário.
  handleLogin(usuario: UsuarioLogin): Promise<void>;

  // Estado que informa se o processo de login está em andamento.
  isLoading: boolean;
}

// Interface responsável por tipar as propriedades do AuthProvider.
// O children representa todos os componentes que serão envolvidos
// pelo Provider.
interface AuthProviderProps {
  children: ReactNode;
}

// Cria o contexto de autenticação.
// Os componentes que utilizarem este contexto terão acesso às
// informações definidas em AuthContextProps.
export const AuthContext = createContext({} as AuthContextProps);

// Componente responsável por fornecer o contexto de autenticação
// para toda a aplicação.
export function AuthProvider({ children }: AuthProviderProps) {
  // Estado responsável por armazenar os dados do usuário autenticado.
  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  // Estado utilizado para controlar o carregamento durante o login.
  const [isLoading, setIsLoading] = useState(false);

  // Função responsável por autenticar o usuário.
  async function handleLogin(usuarioLogin: UsuarioLogin) {
    // Ativa o carregamento.
    setIsLoading(true);

    try {
      // Realiza a requisição de login para a API.
      // Caso seja autenticado, os dados retornados serão
      // armazenados no estado 'usuario'.
      await login(`/usuarios/logar`, usuarioLogin, setUsuario);

      // Exibe mensagem de sucesso.
      alert("O Usuário foi autenticado com sucesso!");
    } catch (error) {
      // Caso ocorra algum erro na autenticação,
      // exibe uma mensagem ao usuário.
      alert("Os Dados do usuário estão inconsistentes!");
    }

    // Finaliza o carregamento.
    setIsLoading(false);
  }

  // Função responsável por realizar o logout.
  function handleLogout() {
    // Limpa todas as informações do usuário,
    // retornando aos valores iniciais.
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: "",
    });
  }

  // Disponibiliza os dados e funções do contexto para todos
  // os componentes filhos envolvidos pelo AuthProvider.
  return (
    <AuthContext.Provider
      value={{
        usuario,
        handleLogin,
        handleLogout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
