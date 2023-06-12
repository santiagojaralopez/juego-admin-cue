import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { Context } from "../Context/Context"
import { SummaryTitle } from "../Components/SummaryTitle"

import { Card, Button } from "@material-tailwind/react"
import Swal from "sweetalert2"

let cupcakePrice = 0;

const welcomeMessage = () => {
  Swal.fire({
    title: 'Valoración del Producto',
    text: 'Esta es la etapa final, acá eliges cuál será el precio de venta de tu cupcake basado en los costos anteriores. La utilidad esperada es del 30% sobre el costo total.',
    icon: 'info',
    allowOutsideClick: false
  })
}

export const Costs = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  const totalPrice = context.cart.reduce((sum, item) => sum + item.price, 0);

  const calculateUtility = (productionPrice) => {
    const utility = cupcakePrice - productionPrice;
    let percentage = (utility / productionPrice) * 100;
    percentage = percentage.toFixed(2);
  
    if (percentage < 30 || percentage > 40) {
      Swal.fire({
        title: 'Hmmm...',
        text: `Parece que no has logrado la utilidad esperada, ha sido del ${percentage}%. Intenta con un precio un poco más alto.`,
        icon: 'warning',
        allowOutsideClick: false
      });
    } else {
      Swal.fire({
        title: '¡Felicitaciones!',
        text: `Has logrado una utilidad del ${percentage}%, tus ganancias han sido $${utility}`,
        icon: 'success',
        confirmButtonText: 'Finalizar juego',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) navigate('/outro');
      });
    }
  }
  
  const setCupcakePrice = (productionPrice) => {
    Swal.fire({
      title: '¿En cuánto quieres vender tu cupcake?',
      input: 'number',
      showCancelButton: true,
      confirmButtonText: 'Establecer precio',
      confirmButtonColor: '#4caf50',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'rgb(180, 35, 37)',
      showLoaderOnConfirm: true,
      preConfirm: (price) => {
        cupcakePrice = price;
      },
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        if (cupcakePrice <= productionPrice) {
          Swal.fire(
            'Precio no aceptado',
            'El precio de venta no puede ser menor o igual al de producción',
            'error'
          ).then((result) => {
            if (result.isConfirmed) setCupcakePrice(productionPrice);
          })
        } else {
          calculateUtility(productionPrice);
        }
      }
    })
  }

  useEffect(() => {
    welcomeMessage();

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };

    window.onbeforeunload = function () {
      return 0;
    };
  })

  return (
    <>
      <SummaryTitle />
      <div className="my-5 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="p-10 mb-10 grid grid-cols-4 grid-flow-row gap-10 rounded-3xl w-[95vw] border-2 border-black">
            {context.cart?.map(item => (
              <Card key={item.id} className="p-5 flex flex-row items-center gap-5">
                <figure className="w-1/4 flex justify-center">
                  <img className="w-[100px]" src={item.image} alt="Item Image" />
                </figure>
                <div className="w-3/4 flex flex-col gap-1 items-start justify-center">
                  <p className="font-cocogoose text-xl">{item.name}</p>
                  <p className="font-cocogoose">${item.price}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="p-10 mb-10 grid grid-cols-2 grid-flow-row gap-5 rounded-3xl w-[95vw] border-2 border-black">
          <div className="flex flex-col gap-2 justify-center">
            <p className="font-cocogoose text-xl">Costo total de todas las etapas</p>
            <p className="font-cocogoose">${totalPrice+450}</p>
          </div>
          <div>
            <Button onClick={() => setCupcakePrice(totalPrice+450)} className="p-8 text-cue-white" color="green">
              <p className="font-cocogoose text-[25px]">Establecer precio de venta</p>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
