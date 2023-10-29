use client

import { Header } from '@/components/Header'
import { CartStateProvider } from '@/contexts/CartContext'
import { globalStyles } from '@/styles/global'
import { Container } from '@/styles/pages/app'
import type { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartStateProvider>
      <CartProvider
        mode="payment"
        cartMode="client-only"
        stripe={String(process.env.STRIPE_SECRET_KEY)}
        successUrl={`${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`}
        cancelUrl={String(process.env.NEXT_URL)}
        currency="BRL"
        allowedCountries={['BR']}
        billingAddressCollection={true}
        shouldPersist
      >
        <Container>
          <Header />

          <Component {...pageProps} />
        </Container>
      </CartProvider>
    </CartStateProvider>
  )
}
