// Importa os Hooks do React.
// - useEffect: executa efeitos colaterais durante o ciclo de vida do componente.
// - useState: cria estados para armazenar informações.
// - ChangeEvent: tipa eventos de alteração dos campos do formulário.
// - FormEvent: tipa o evento de envio do formulário.
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

// Importa a função responsável por enviar os dados do usuário para a API.
import { cadastrarUsuario } from "../../services/Service";

// Importa o Hook responsável pela navegação entre páginas.
import { useNavigate } from "react-router-dom";

// Importa a interface que representa a estrutura dos dados do usuário.
import type Usuarios from "../../models/Usuario";

// Importa um componente de carregamento (spinner) para indicar que
// uma requisição está sendo processada.
import { ClipLoader } from "react-spinners";

// Componente responsável pelo cadastro de novos usuários.
function Cadastro() {
  // Hook utilizado para realizar navegação entre páginas.
  const navigate = useNavigate();

  // Estado responsável por controlar se a requisição está em andamento.
  // Quando verdadeiro, exibe o spinner de carregamento.
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Estado responsável por armazenar o valor digitado
  // no campo "Confirmar Senha".
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

  // Estado que armazena todos os dados do usuário que serão enviados para a API.
  const [usuarios, setUsuarios] = useState<Usuarios>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  // Sempre que o ID do usuário for alterado,
  // verifica se ele foi cadastrado com sucesso.
  // Caso o ID seja diferente de zero, redireciona para a tela inicial.
  useEffect(() => {
    if (usuarios.id !== 0) {
      retornar();
    }
  }, [usuarios.id]);

  // Função responsável por redirecionar o usuário para a página inicial.
  function retornar() {
    navigate("/");
  }

  // Atualiza automaticamente o estado "usuarios"
  // conforme o usuário digita nos campos do formulário.
  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarios({
      ...usuarios,
      [e.target.name]: e.target.value,
    });
  }

  // Atualiza apenas o estado da confirmação de senha.
  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  // Função responsável pelo envio do formulário de cadastro.
  async function cadastrarNovoUsuarios(e: FormEvent<HTMLFormElement>) {
    // Impede o comportamento padrão do formulário,
    // que seria recarregar a página.
    e.preventDefault();

    // Verifica se as senhas são iguais
    // e se possuem pelo menos 8 caracteres.
    if (confirmarSenha === usuarios.senha && usuarios.senha.length >= 8) {
      // Ativa o carregamento.
      setIsLoading(true);

      try {
        // Envia os dados do usuário para a API.
        await cadastrarUsuario(`/usuarios/cadastrar`, usuarios, setUsuarios);

        // Exibe mensagem de sucesso.
        alert("Usuário cadastrado com sucesso!");
      } catch (error) {
        // Caso ocorra algum erro durante o cadastro,
        // exibe uma mensagem ao usuário.
        alert("Erro ao cadastrar o usuário!");
      }
    } else {
      // Caso as senhas sejam diferentes ou muito curtas,
      // exibe uma mensagem de erro.
      alert(
        "Dados do usuário inconsistentes! Verifique as informações do cadastro.",
      );

      // Limpa apenas o campo da senha.
      setUsuarios({
        ...usuarios,
        senha: "",
      });

      // Limpa o campo de confirmação.
      setConfirmarSenha("");
    }

    // Finaliza o carregamento.
    setIsLoading(false);
  }

  return (
    <>
      {/* Estrutura principal da página de cadastro */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        {/* Imagem exibida apenas em telas grandes */}
        <div
          className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')]
          lg:block hidden bg-no-repeat
          w-full min-h-screen bg-cover bg-center"
        ></div>

        {/* Formulário de cadastro */}
        <form
          className="flex justify-center items-center flex-col w-2/3 gap-3"
          onSubmit={cadastrarNovoUsuarios}
        >
          <h2 className="text-slate-900 text-5xl">Cadastrar</h2>

          {/* Campo Nome */}
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>

            <input
              type="text"
              id="nome"
              name="nome"
              value={usuarios.nome}
              onChange={(e) => atualizarEstado(e)}
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>

          {/* Campo Usuário */}
          <div className="flex flex-col w-full">
            <label htmlFor="usuarios">Usuário</label>

            <input
              type="text"
              id="usuario"
              name="usuario"
              value={usuarios.usuario}
              onChange={(e) => atualizarEstado(e)}
              placeholder="Usuário"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>

          {/* Campo Foto */}
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>

            <input
              type="text"
              id="foto"
              name="foto"
              value={usuarios.foto}
              onChange={(e) => atualizarEstado(e)}
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>

          {/* Campo Senha */}
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>

            <input
              type="password"
              id="senha"
              name="senha"
              value={usuarios.senha}
              onChange={(e) => atualizarEstado(e)}
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>

          {/* Campo Confirmar Senha */}
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>

            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={confirmarSenha}
              onChange={(e) => handleConfirmarSenha(e)}
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>

          {/* Botões de ação */}
          <div className="flex justify-around w-full gap-8">
            {/* Cancela o cadastro e retorna para a página inicial */}
            <button
              type="reset"
              className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2"
              onClick={retornar}
            >
              Cancelar
            </button>

            {/* Envia o formulário */}
            <button
              type="submit"
              className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2 flex justify-center"
            >
              {/* Enquanto a requisição estiver sendo executada,
                  exibe um spinner de carregamento. */}
              {isLoading ? (
                <ClipLoader color="#ffffff" size={24} />
              ) : (
                <span>Cadastrar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

// Exporta o componente para ser utilizado em outras partes da aplicação.
export default Cadastro;
