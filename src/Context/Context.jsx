import { createContext } from "react"
import { useState } from "react"

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [budget, setBudget] = useState(1700);
  const [cart, setCartItems] = useState([]);

  return (
    <Context.Provider
      value={{
        budget, setBudget,
        cart, setCartItems
      }}
    >
      {children}
    </Context.Provider>
  )
}