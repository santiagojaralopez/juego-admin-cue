import { useContext } from "react"

import { Context } from "../Context/Context"

export const Budget = () => {
  const context = useContext(Context);

  return (
    <nav className="flex justify-end">
      <div className="p-5 mr-10 flex items-center justify-center bg-cue-blue rounded-b-3xl">
        <p className="font-cocogoose text-cue-white text-[20px]">
          Presupuesto disponible: ${context.budget}
        </p>
      </div>
    </nav>
  )
}
