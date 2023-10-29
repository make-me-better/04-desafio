import Image from 'next/image'
import { Handbag } from 'phosphor-react'
import { CartButton, HeaderContainer } from '@/styles/components/header'
import { Cart } from './Cart'
import * as Dialog from '@radix-ui/react-dialog'
import { useShoppingCart } from 'use-shopping-cart'
import { useContext } from 'react'
import { CartContext } from '@/contexts/CartContext'

import logoImage from '../assets/logo.svg'

export function Header() {
  const { cartCount } = useShoppingCart()

  const { cartState, onOpenChange } = useContext(CartContext)

  return (
    <HeaderContainer>
      <Image src={logoImage} alt="" width={130} height={52} priority={true} />

      <Dialog.Root open={cartState} onOpenChange={onOpenChange}>
        <Dialog.Trigger asChild>
          <CartButton>
            <Handbag size={24} weight="bold" />
            <span>{cartCount}</span>
          </CartButton>
        </Dialog.Trigger>

        <Cart />
      </Dialog.Root>
    </HeaderContainer>
  )
}
