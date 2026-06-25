import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>
      <div className="w-full flex justify-center py-4 bg-indigo-500 text-white">
        <div className="container flex justify-between text-lg mx-8">
          {/* Link funciona como uma tag <a>, mas para aplicações React.*/}
          {/*  Define para qual rota o usuário será direcionado ao clicar. to='/home'.*/}
          <Link to="/home" className="text-2xl font-bold">
            Blog Pessoal
          </Link>
          <div className="flex gap-4">
            Postagens Temas Cadastrar Tema Perfil Sair
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
