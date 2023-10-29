import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { useShoppingCart } from 'use-shopping-cart'
import React, { useState } from 'react'
import { priceFormatter } from '@/utils/formatter'

import {
  CartListContainer,
  CartListDetails,
  CartListItem,
  CartListItemImage,
  CloseButton,
  Content,
  ResumeContainer,
  Title,
} from '@/styles/components/cart'

export function Cart() {
  const { cartCount, cartDetails, removeItem, totalPrice, redirectToCheckout } =
    useShoppingCart()

  const [status, setStatus] = useState('idle')

  function handleRemoveItem(idProduct: string) {
    removeItem(idProduct)
  }

  async function handleGoToCheckout(
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.preventDefault()

    if (cartCount && cartCount > 0) {
      setStatus('idle')
      try {
        const result = await redirectToCheckout()
        if (result?.error) {
          console.error(result)
          setStatus('redirect-error')
        }
      } catch (error) {
        console.error(error)
        setStatus('redirect-error')
      }
    } else {
      setStatus('missing-items')
    }
  }

  return (
    <Dialog.Portal>
      <Content>
        <CloseButton>
          <X size={24} weight="bold" />
        </CloseButton>

        <Title>Sacola de Compras</Title>

        <CartListContainer>
          {Object.values(cartDetails ?? {}).map((product) => {
            return (
              <CartListItem key={product.id}>
                <CartListItemImage>
                  <Image
                    src={String(product.image)}
                    width={95}
                    height={95}
                    alt=""
                  />
                </CartListItemImage>
                <CartListDetails>
                  <span>
                    {product.name}
                    <strong>
                      {priceFormatter.format(product.price)}
                      {product.quantity > 1 ? ' x ' + product.quantity : ''}
                    </strong>
                  </span>
                  <button onClick={() => handleRemoveItem(product.id)}>
                    Remover
                  </button>
                </CartListDetails>
              </CartListItem>
            )
          })}
        </CartListContainer>

        <ResumeContainer>
          <div>
            <div>Quantidade</div>
            <span>
              {cartCount === 1 ? cartCount + ' item' : cartCount + ' itens'}
            </span>
          </div>
          <div>
            <div>Valor Total</div>
            <span>
              {priceFormatter.format(cartCount === 0 ? 0 : totalPrice || 0)}
            </span>
          </div>

          <button onClick={handleGoToCheckout}>Finalizar Compra</button>
        </ResumeContainer>
      </Content>
    </Dialog.Portal>
  )
}
