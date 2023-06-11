import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { Context } from "../Context/Context"
import { Budget } from "../Components/Budget"

import { Card, Button } from "@material-tailwind/react"
import Swal from "sweetalert2"

const distributionMethods = [
  {
    id: "011",
    name: "Venta en línea",
    description: "Consiste en la compra y venta de productos o servicios utilizando plataformas digitales, donde los compradores pueden acceder a una amplia variedad de productos, comparar precios, realizar pagos electrónicos y recibir los productos en su domicilio. Es una forma conveniente y accesible de adquirir productos y servicios sin necesidad de desplazarse físicamente a una tienda tradicional.",
    price: 100,
    image: "https://cdn-icons-png.flaticon.com/128/4998/4998644.png",
    selected: false
  },
  {
    id: "012",
    name: "Supermercados",
    description: "Son establecimientos comerciales de gran tamaño que ofrecen una amplia variedad de productos de consumo diario, como alimentos, productos de limpieza, artículos de cuidado personal y otros productos básicos. Estos establecimientos están diseñados para ofrecer comodidad a los clientes, ya que cuentan con estanterías y pasillos organizados, carritos de compras y cajas registradoras para facilitar el proceso de compra.",
    price: 250,
    image: "https://cdn-icons-png.flaticon.com/128/3695/3695283.png",
    selected: false
  },
  {
    id: "013",
    name: "Punto de venta propio",
    description: "Son establecimientos físicos que pertenecen y son operados directamente por una empresa. Estos puntos de venta son utilizados para vender productos o servicios directamente al consumidor final. Pueden ser tiendas, sucursales o locales comerciales que están bajo el control y la gestión directa de la empresa propietaria.",
    price: 350,
    image: "https://cdn-icons-png.flaticon.com/128/3733/3733928.png",
    selected: false
  }
]

const welcomeMessage = () => {
  Swal.fire(
    'Distribución de producto',
    'Esta es la segunda etapa, acá eliges cuál será el método de distribución para tus cupcakes. Solo podrás seleccionar una de las opciones. Recuerda administrar bien tu dinero, aún te falta una etapa.',
    'info'
  )
}

export const Distribution = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  const [distributionMethodsItems, setDistributionMethodsItems] = useState(distributionMethods);

  useEffect(() => {
    welcomeMessage();

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
    const distributionMethodsCount = context.cart.filter(cartItem =>
      distributionMethods.some(item => item.id === cartItem.id)
    ).length;
  
    if (distributionMethodsCount === 1) {
      const totalPrice = context.cart.reduce((sum, item) => sum + item.price, 0);

      Swal.fire({
        title: '<strong>Proceso finalizado</strong>',
        icon: 'success',
        html: `Gastos hasta el momento: $${totalPrice+450}`,
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: 'Siguiente Etapa'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/distribution');
        }
      });
    } else {
      Swal.fire(
        'Error',
        'Recuerda seleccionar uno de los métodos de distribución del producto',
        'error'
      )
    }
  };

  return (
    <>
      <Budget />
      <div className="my-5 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="mb-10 px-5 py-10 flex flex-col items-center rounded-3xl w-[95vw] gap-10 border-2 border-black">
            {distributionMethodsItems?.map(item => (
              <Card key={item.id} onClick={() => addToCart(item, item.id, setDistributionMethodsItems)} className={`w-[90%] p-5 flex flex-row items-center gap-5 hover:cursor-pointer ${item.selected ? 'bg-cue-grey' : ''}`}>
                <figure className="w-1/4 flex justify-center">
                  <img className="w-[100px]" src={item.image} alt="Item Image" />
                </figure>
                <div className="w-3/4 flex flex-col gap-5 items-start justify-center">
                  <p className="font-cocogoose text-xl">{item.name}: ${item.price}</p>
                  <p className="font-cocogoose">{item.description}</p>
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
