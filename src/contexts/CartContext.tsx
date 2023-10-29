import { ReactNode, createContext, useState } from 'react'

interface CartContextType {
  cartState: boolean
  onOpenChange: (state: boolean) => void
  openCart: () => void
  closeCart: () => void
}

export const CartContext = createContext({} as CartContextType)

interface CartProviderProps {
  children: ReactNode
}

export function CartStateProvider({ children }: CartProviderProps) {
  const [cartState, setCartState] = useState(false)

  function onOpenChange(state: boolean) {
    setCartState(state)
  }

  function openCart() {
    setCartState(true)
  }

  function closeCart() {
    setCartState(false)
  }

  return (
    <CartContext.Provider
      value={{ cartState, onOpenChange, openCart, closeCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
