import { NavLink } from "react-router-dom"

import { Button } from "@material-tailwind/react"


export const Home = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-20 items-center justify-center bg-cue-blue">
      <div className="w-[70%] h-auto flex gap-5 items-center justify-center">
        <div className="w-[500px]">
          <img src="https://www.dhla.org/wp-content/uploads/2019/08/LOGO-uvonhumboldt.png" alt="Logo CUE" />
        </div>
        <div className="text-center">
          <p className="text-cue-white font-bold text-[50px]">Programa de Administración de Empresas Dual</p>
        </div>
      </div>
      <Button className="text-cue-white text-[30px]" color="green">
        <NavLink to='/product-design'>Iniciar Juego</NavLink>
      </Button>
    </div>
  )
}
