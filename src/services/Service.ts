// Importa a biblioteca Axios, responsável por realizar requisições HTTP
// para consumir uma API (Backend).
import axios from "axios";

// Cria uma instância personalizada do Axios.
// A propriedade baseURL define o endereço base da API.
// Todas as requisições utilizarão essa URL como referência.
const api = axios.create({
  baseURL: "https://blogpessoal-api-java84.onrender.com",
});

// Função assíncrona responsável por cadastrar um novo usuário.
// Parâmetros:
// url -> endpoint da API que será acessado.
// dados -> objeto contendo as informações do usuário.
// setDados -> função que atualizará o estado da aplicação com a resposta da API.
export const cadastrarUsuario = async (
  url: string,
  dados: Object,
  setDados: Function,
) => {
  // Envia uma requisição HTTP POST para a API.
  // A URL final será:
  // https://blog-pessoal-nnbz.onrender.com + url
  // Exemplo:
  // https://blog-pessoal-nnbz.onrender.com/usuarios/cadastrar
  const resposta = await api.post(url, dados);
  setDados(resposta.data);  // Atualiza o estado da aplicação com os dados retornados pela API.
};

// Função assíncrona responsável por realizar o login do usuário.
// Parâmetros:
// url -> endpoint de login.
// dados -> objeto contendo usuário e senha.
// setDados -> função que armazenará os dados retornados pela API.
export const login = async (url: string, dados: Object, setDados: Function) => {
  // Envia uma requisição POST com as credenciais do usuário.
  const resposta = await api.post(url, dados);

  // Armazena os dados retornados pela API,
  // como Token JWT, nome do usuário, id, etc.
  setDados(resposta.data);
};

//Função do CRUD
export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}

export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}

export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header)
}