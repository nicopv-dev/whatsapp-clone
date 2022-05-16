import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const login = () => {
    window.open(`${import.meta.env.VITE_SERVER_URL}/api/auth/google`, "_self");
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="min-h-[95vh] bg-light w-full md:w-[60%] flex flex-col items-center justify-center shadow-2xl">
        <h1 className="text-2xl">Para user Whatsapp Clone en tu Navegador</h1>
        <h4>Solo inicia sesion con una cuenta de Google</h4>
        <button
          className="bg-gray flex items-center gap-3 my-3 py-1 px-4"
          onClick={login}
          type="button"
        >
          <FcGoogle className="w-10 h-10" />
          Iniciar Sesion
        </button>
      </div>
    </div>
  );
}
