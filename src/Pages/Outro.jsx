import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { Context } from "../Context/Context"

import { Button } from "@material-tailwind/react"

export const Outro = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  const returnToStart = () => {
    context.setBudget(1700);
    context.setCartItems([]);
    navigate('/');
  }

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };

    window.onbeforeunload = function () {
      return 0;
    };
  })

  return (
    <div className="w-screen h-screen flex flex-col gap-32 items-center justify-center bg-cue-blue">
      <div className="w-[70%] h-auto flex gap-2 items-center justify-center">
        <div className="w-[400px] flex justify-center">
          <img src="https://cdn-icons-png.flaticon.com/128/2876/2876201.png" alt="Logo CUE" />
        </div>
        <div className="flex flex-col text-start">
          <p className="text-cue-white font-calibri font-bold text-[50px]">Gracias por jugar</p>
          <p className="text-cue-white font-calibri text-[25px]">Desarrollado con ❤️ por Santiago Jaramillo López del programa de Ingeniería de Software para el Programa de Administración de Empresas Dual</p>
        </div>
      </div>
      <Button onClick={returnToStart} className="text-cue-white font-calibri text-[30px]" color="blue">Volver al inicio</Button>
    </div>
  )
}
