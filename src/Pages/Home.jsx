import { NavLink } from "react-router-dom"

import { Button } from "@material-tailwind/react"


export const Home = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-20 items-center justify-center bg-cue-blue">
      <div className="w-[70%] h-auto flex gap-20 items-center justify-center">
        <div className="w-[400px]">
          <img src="https://www.dhla.org/wp-content/uploads/2019/08/LOGO-uvonhumboldt.png" alt="Logo CUE" />
        </div>
        <div className="flex flex-col text-start">
          <p className="text-cue-white font-calibri font-bold text-[50px]">CakeCraft</p>
          <p className="text-cue-white font-calibri text-[40px]">Un juego del Programa de Administración de Empresas Dual</p>
        </div>
      </div>
      <NavLink to='/product-design'>
        <Button className="text-cue-white text-[30px]" color="green">Iniciar Juego</Button>
      </NavLink>
    </div>
  )
}
