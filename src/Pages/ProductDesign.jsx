import { Card, Button } from "@material-tailwind/react"
import { NavLink } from "react-router-dom"
import Swal from "sweetalert2"

import { Budget } from "../Components/Budget"


const obligatory = [
  {
    id: '001',
    name: 'Harina',
    price: 50,
    image: 'https://cdn-icons-png.flaticon.com/128/992/992730.png'
  },
  {
    id: '002',
    name: 'Huevos',
    price: 100,
    image: 'https://cdn-icons-png.flaticon.com/128/3142/3142726.png'
  },
  {
    id: '003',
    name: 'Leche',
    price: 200,
    image: 'https://cdn-icons-png.flaticon.com/128/5125/5125422.png'
  },
  {
    id: '004',
    name: 'Levadura',
    price: 50,
    image: 'https://cdn-icons-png.flaticon.com/128/3348/3348061.png'
  }
]

const optional = [
  {
    id: '005',
    name: 'Crema de chocolate',
    price: 70,
    image: 'https://cdn-icons-png.flaticon.com/128/3142/3142729.png'
  },
  {
    id: '006',
    name: 'Chips de chocolate',
    price: 80,
    image: 'https://cdn-icons-png.flaticon.com/128/6823/6823969.png'
  },
  {
    id: '007',
    name: 'Chips de colores',
    price: 75,
    image: 'https://cdn-icons-png.flaticon.com/128/761/761946.png'
  },
  {
    id: '008',
    name: 'Crema de vainilla',
    price: 80,
    image: 'https://cdn-icons-png.flaticon.com/128/6451/6451556.png'
  }
]

const packages = [
  {
    id: '009',
    name: 'Empaque biodegradable',
    price: 100,
    image: 'https://cdn-icons-png.flaticon.com/128/3098/3098211.png'
  },
  {
    id: '010',
    name: 'Empaque plastico',
    price: 30,
    image: 'https://cdn-icons-png.flaticon.com/128/6882/6882263.png'
  }
]

const welcomeMessage = () => {
  Swal.fire({
    title: 'Hola!',
    text: "Tu misión es crear un cupcake. Pasarás por distintas etapas, así que recuerda administrar muy bien tu presupuesto.",
    icon: 'info',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Siguiente'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Diseño de producto',
        'Esta es la primera etapa, acá debes diseñar tu cupcake. Cuentas con tres columnas: Materia prima, Personalización y Empaquetado. Recuerda que toda la materia prima es obligatoria. Puedes escoger todos los toppings o ninguno y solo un tipo de paquete. Adelante!',
        'info'
      )
    }
  })
}

export const ProductDesign = () => {
  return (
    <>
      <Budget />
      <div className="flex flex-col items-center justify-center">
        <div className="mt-5 flex items-center justify-center" onLoad={welcomeMessage}>
          <div className="mb-10 p-5 flex rounded-3xl w-[95vw] h-[90%] gap-5 border-2 border-black">
            <div className="w-1/3 border-r-2 flex flex-col gap-10 items-center">
              <h2 className="text-xl font-cocogoose">Materia prima</h2>
              {obligatory?.map(item => (
                <Card key={item.id} className="w-[70%] p-5 flex flex-row gap-5">
                  <figure className="h-[100px] flex ">
                    <img className="h-full w-auto" src={item.image} alt="Item Image" />
                  </figure>
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-cocogoose">{item.name}</p>
                    <p className="font-cocogoose">${item.price}</p>
                  </div>
                </Card>
              ))}
            </div>
            <div className="w-1/3 flex flex-col gap-10 items-center">
              <h2 className="text-xl font-cocogoose">Personalización</h2>
              {optional?.map(item => (
                <Card key={item.id} className="w-[70%] p-5 flex flex-row gap-5">
                  <figure className="h-[100px] flex ">
                    <img className="h-full w-auto" src={item.image} alt="Item Image" />
                  </figure>
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-cocogoose">{item.name}</p>
                    <p className="font-cocogoose">${item.price}</p>
                  </div>
                </Card>
              ))}
            </div>
            <div className="w-1/3 flex flex-col gap-10 items-center border-l-2">
              <h2 className="text-xl font-cocogoose">Empaquetado</h2>
              {packages?.map(item => (
                <Card key={item.id} className="w-[70%] p-5 flex flex-row gap-5">
                  <figure className="h-[100px] flex ">
                    <img className="h-full w-auto" src={item.image} alt="Item Image" />
                  </figure>
                  <div className="flex flex-col items-center justify-center">
                    <p className="font-cocogoose">{item.name}</p>
                    <p className="font-cocogoose">${item.price}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <Button className="text-cue-white text-[25px] w-[25%]" color="green">
          <NavLink to='/product-design'>Finalizar Proceso</NavLink>
        </Button>
      </div>
    </>
  )
}
