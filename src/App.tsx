import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Cadastro from "./cadastro/Cadastro";
import Login from "./login/Login";

function App() {
  return (
    <>
      {/* BrowserRouter é o componente responsável por habilitar // a navegação
      entre páginas na aplicação React.*/}
      <BrowserRouter>
        <Navbar /> {/* Componente de navegação exibido em todas as páginas */}
       
        <div className="min-h-[80vh]">
          {/* Routes agrupa todas as rotas da aplicação */}
          <Routes>
            {/* Quando a URL for "/", renderiza o componente Home */}
            <Route path="/" element={<Login />}/>
            <Route path="/home" element={<Home />}/>
            <Route path="/Cadastro" element={<Cadastro />}/>
          </Routes>
        </div>
        {/* Rodapé exibido em todas as páginas */}
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
