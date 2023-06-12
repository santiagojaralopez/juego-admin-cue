import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { Context } from "../Context/Context"
import { Budget } from "../Components/Budget"

import { Card, Button } from "@material-tailwind/react"
import Swal from "sweetalert2"

const marketingStrategies = [
  {
    id: "014",
    name: "Pauta en Redes Sociales",
    price: 150,
    image: "https://cdn-icons-png.flaticon.com/128/4187/4187336.png",
    selected: false
  },
  {
    id: "015",
    name: "Vallas Publicitarias",
    price: 160,
    image: "https://cdn-icons-png.flaticon.com/128/4746/4746459.png",
    selected: false
  },
  {
    id: "016",
    name: "Telemercadeo",
    price: 70,
    image: "https://cdn-icons-png.flaticon.com/128/6633/6633185.png",
    selected: false
  },
  {
    id: "017",
    name: "Posicionamiento en Buscadores",
    price: 180,
    image: "https://cdn-icons-png.flaticon.com/128/4693/4693249.png",
    selected: false
  },
  {
    id: "018",
    name: "Impulsadores",
    price: 90,
    image: "https://cdn-icons-png.flaticon.com/128/1924/1924692.png",
    selected: false
  },
  {
    id: "019",
    name: "Influencer",
    price: 200,
    image: "https://cdn-icons-png.flaticon.com/128/2278/2278959.png",
    selected: false
  },
]

const welcomeMessage = () => {
  Swal.fire({
    title: 'Estratetgias de Marketing',
    text: 'Esta es la tercera etapa, acá eliges cuál o cuáles serán las estrategias de marketing para la venta de tus cupcakes. Podrás seleccionar una o dos de las opciones que se te presentan. Hazlo sabiamente.',
    icon: 'info',
    allowOutsideClick: false
  })
}

const outOfMoneyMessage = () => {
  Swal.fire({
    title: 'Fondos insuficientes',
    text: 'Parece que no te quedan los fondos suficientes para esta acción',
    icon: 'error',
    allowOutsideClick: false
  })
}

export const Marketing = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  const [marketingStrategiesItems, setMarketingStrategiesItems] = useState(marketingStrategies);

  useEffect(() => {
    if (context.budget < 70) {
      outOfMoneyMessage();
    } else {
      welcomeMessage();
    }

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };

    window.onbeforeunload = function () {
      return 0;
    };
  }, []);

  const setItemState = (itemId, setItems) => {
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId) {
          return { ...item, selected: !item.selected };
        }
        return item;
      });
    });
  };

  const addToCart = (newItem, itemId, setItems) => {
    const exists = context.cart.some(obj => obj.id === newItem.id);

    if (exists) {
      const index = context.cart.findIndex(obj => obj.id === newItem.id);
      context.cart.splice(index, 1);
      setItemState(itemId, setItems);
      context.setBudget(context.budget + newItem.price);
    } else {
      if (context.budget - newItem.price < 0) {
        Swal.fire(
          'Fondos insuficientes',
          'Parece que no te quedan los fondos suficientes para esta acción',
          'error'
        )
      } else {
        context.cart.push(newItem);
        setItemState(itemId, setItems);
        context.setBudget(context.budget - newItem.price);
      }
    }
  }

  const checkCartItems = () => {
    const marketingStrategiesCount = context.cart.filter(cartItem =>
      marketingStrategies.some(item => item.id === cartItem.id)
    ).length;
  
    if (marketingStrategiesCount >= 1 && marketingStrategiesCount <= 2) {
      const totalPrice = context.cart.reduce((sum, item) => sum + item.price, 0);

      Swal.fire({
        title: '<strong>Proceso finalizado</strong>',
        icon: 'success',
        html: `Gastos hasta el momento: $${totalPrice+450}`,
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: 'Finalizar Producción',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/costs');
        }
      });
    } else {
      Swal.fire(
        'Error',
        'Recuerda seleccionar las estrategias de marketing correctamente',
        'error'
      )
    }
  };

  return (
    <>
      <Budget />
      <div className="my-5 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="p-10 mb-10 grid grid-cols-2 grid-flow-row gap-10 rounded-3xl w-[95vw] border-2 border-black">
            {marketingStrategiesItems?.map(item => (
              <Card key={item.id} onClick={() => addToCart(item, item.id, setMarketingStrategiesItems)} className={`p-5 flex flex-row items-center gap-5 hover:cursor-pointer ${item.selected ? 'bg-cue-grey' : ''}`}>
                <figure className="w-1/4 flex justify-center">
                  <img className="w-[100px]" src={item.image} alt="Item Image" />
                </figure>
                <div className="w-3/4 flex flex-col gap-5 items-start justify-center">
                  <p className="font-cocogoose text-xl">{item.name}</p>
                  <p className="font-cocogoose">${item.price}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <Button onClick={checkCartItems} className="text-cue-white text-[25px] w-[25%]" color="green">
          <p className="font-cocogoose">Finalizar Proceso</p>
        </Button>
      </div>
    </>
  )
}
