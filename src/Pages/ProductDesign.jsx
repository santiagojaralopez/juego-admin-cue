import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { Context } from "../Context/Context"
import { Budget } from "../Components/Budget"

import { Card, Button } from "@material-tailwind/react"
import Swal from "sweetalert2"

const obligatory = [
  {
    id: '001',
    name: 'Harina',
    price: 50,
    image: 'https://cdn-icons-png.flaticon.com/128/992/992730.png',
    selected: false
  },
  {
    id: '002',
    name: 'Huevos',
    price: 100,
    image: 'https://cdn-icons-png.flaticon.com/128/3142/3142726.png',
    selected: false
  },
  {
    id: '003',
    name: 'Leche',
    price: 200,
    image: 'https://cdn-icons-png.flaticon.com/128/5125/5125422.png',
    selected: false
  },
  {
    id: '004',
    name: 'Polvo de Hornear',
    price: 50,
    image: 'https://cdn-icons-png.flaticon.com/128/3348/3348061.png',
    selected: false
  }
]

const optional = [
  {
    id: '005',
    name: 'Crema de chocolate',
    price: 70,
    image: 'https://cdn-icons-png.flaticon.com/128/3142/3142729.png',
    selected: false
  },
  {
    id: '006',
    name: 'Chips de chocolate',
    price: 80,
    image: 'https://cdn-icons-png.flaticon.com/128/6823/6823969.png',
    selected: false
  },
  {
    id: '007',
    name: 'Chips de colores',
    price: 75,
    image: 'https://cdn-icons-png.flaticon.com/128/761/761946.png',
    selected: false
  },
  {
    id: '008',
    name: 'Crema de vainilla',
    price: 80,
    image: 'https://cdn-icons-png.flaticon.com/128/6451/6451556.png',
    selected: false
  }
]

const packages = [
  {
    id: '009',
    name: 'Empaque biodegradable',
    price: 100,
    image: 'https://cdn-icons-png.flaticon.com/128/3098/3098211.png',
    selected: false
  },
  {
    id: '010',
    name: 'Empaque plástico',
    price: 30,
    image: 'https://cdn-icons-png.flaticon.com/128/3141/3141472.png',
    selected: false
  }
]

const welcomeMessage = () => {
  Swal.fire({
    title: '¡Hola!',
    text: "Tu misión es crear un cupcake. Pasarás por distintas etapas, así que recuerda administrar muy bien tu presupuesto.",
    icon: 'info',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Siguiente',
    allowOutsideClick: false
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Diseño de producto',
        text: 'Esta es la primera etapa, acá debes diseñar tu cupcake. Cuentas con tres columnas para seleccionar el material a usar: Materia prima, Personalización y Empaquetado. Recuerda que toda la materia prima es obligatoria. Puedes escoger todas las opciones de personalización o ninguna, y solo un tipo de empaquetado. Además, debes tener en cuenta que hay costos de mano de obra y operación que se descontarán al final. Adelante!',
        icon: 'info',
        allowOutsideClick: false
      })
    }
  })
}

export const ProductDesign = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  const [obligatoryItems, setObligatoryItems] = useState(obligatory);
  const [optionalItems, setOptionalItems] = useState(optional);
  const [packageItems, setPackageItems] = useState(packages);

  useEffect(() => {
    welcomeMessage();
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

  const addToCart = newItem => {
    const exists = context.cart.some(obj => obj.id === newItem.id);

    if (exists) {
      const index = context.cart.findIndex(obj => obj.id === newItem.id);
      context.cart.splice(index, 1);
      context.setBudget(context.budget + newItem.price);
    } else {
      context.cart.push(newItem);
      context.setBudget(context.budget - newItem.price);
    }
  }

  const checkCartItems = () => {
    const allObligatoryItemsIncluded = obligatory.every(obligatoryItem =>
      context.cart.some(cartItem => cartItem.id === obligatoryItem.id)
    );
  
    const packageItemsCount = context.cart.filter(cartItem =>
      packages.some(packageItem => packageItem.id === cartItem.id)
    ).length;
  
    const isValidCart =
      allObligatoryItemsIncluded && packageItemsCount === 1;
  
    if (isValidCart) {
      const totalPrice = context.cart.reduce((sum, item) => sum + item.price, 0);

      Swal.fire({
        title: '<strong>Proceso finalizado</strong>',
        icon: 'success',
        html:
          `Costo total de productos seleccionados: $${totalPrice}<br>` +
          'Costo de mano de obra: $350<br>Costos de operación (energía y agua): $100<br>' +
          `Costo final de esta etapa: $${totalPrice+450}`,
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: 'Siguiente Etapa',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/distribution');
        }
      })

      context.setBudget(context.budget - 450);
    } else {
      Swal.fire(
        'Error',
        'El producto no cumple con las especificaciones mínimas de calidad',
        'error'
      )
    }
  };

  const handleItemClick = (item, itemId, setItems) => {
    setItemState(itemId, setItems);
    addToCart(item);
  }

  return (
    <>
      <Budget />
      <div className="my-5 flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="mb-10 p-5 flex rounded-3xl w-[95vw] gap-5 border-2 border-black">
            <div className="w-1/3 border-r-2 flex flex-col gap-6 items-center">
              <h2 className="text-xl font-cocogoose">Materia prima</h2>
              {obligatoryItems?.map(item => (
                <Card key={item.id} onClick={() => handleItemClick(item, item.id, setObligatoryItems)} className={`w-[70%] p-5 flex flex-row gap-5 hover:cursor-pointer ${item.selected ? 'bg-cue-grey' : ''}`}>
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
            <div className="w-1/3 flex flex-col gap-6 items-center">
              <h2 className="text-xl font-cocogoose">Personalización</h2>
              {optionalItems?.map(item => (
                <Card key={item.id} onClick={() => handleItemClick(item, item.id, setOptionalItems)} className={`w-[70%] p-5 flex flex-row gap-5 hover:cursor-pointer ${item.selected ? 'bg-cue-grey' : ''}`}>
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
            <div className="w-1/3 flex flex-col gap-6 items-center border-l-2">
              <h2 className="text-xl font-cocogoose">Empaquetado</h2>
              {packageItems?.map(item => (
                <Card key={item.id} onClick={() => handleItemClick(item, item.id, setPackageItems)} className={`w-[70%] p-5 flex flex-row gap-5 hover:cursor-pointer ${item.selected ? 'bg-cue-grey' : ''}`}>
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
        <Button className="text-cue-white text-[25px] w-[25%]" color="green" onClick={checkCartItems}>
          <p className="font-cocogoose">Finalizar Proceso</p>
        </Button>
      </div>
    </>
  )
}
