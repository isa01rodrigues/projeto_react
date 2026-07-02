import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/home/Home";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import ListaTemas from "./components/tema/listatemas/ListaTemas";
import FormTema from "./components/tema/formtema/FormTema";
import DeletarTema from "./components/tema/deletartema/DeletarTema";
import ListaPostagens from "./components/postagem/listapostagens/ListaPostagens";
import FormPostagem from "./components/postagem/formpostagem/FormPostagem";
import DeletarPostagem from "./components/postagem/deletarpostagem/DeletarPostagem";

function App() {
  return (
    <>
      {/* BrowserRouter é o componente responsável por habilitar // a navegação
      entre páginas na aplicação React.*/}
      <AuthProvider>
        <BrowserRouter>
          <Navbar /> {/* Componente de navegação exibido em todas as páginas */}
          <div className="min-h-[80vh]">
            {/* Routes agrupa todas as rotas da aplicação */}
            <Routes>
              {/* Quando a URL for "/", renderiza o componente Home */}
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/Cadastro" element={<Cadastro />} />
              <Route path="/Cadastro" element={<ListaTemas />} />
              <Route path="/cadastrartema" element={<FormTema />} />
              <Route path="/editartema/:id" element={<FormTema />} />
              <Route path="/deletartema/:id" element={<DeletarTema />} />
              <Route path="/postagens" element={<ListaPostagens />} />
              <Route path="/cadastrarpostagem" element={<FormPostagem />} />
              <Route path="/editarpostagem/:id" element={<FormPostagem />} />
              <Route path="/deletarpostagem/:id" element={<DeletarPostagem />} />
            </Routes>
          </div>
          {/* Rodapé exibido em todas as páginas */}
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
